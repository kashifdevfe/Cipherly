---
title: "How to Verify HMAC Signatures in API Webhooks (Stripe, GitHub & More)"
description: "Learn how HMAC webhook verification works, why it prevents forged requests, and how to implement signature checks in Node.js with Stripe and GitHub examples."
date: "2026-06-26"
category: "Tutorial"
author: "Cipherly Team"
toolLink: "/tools/hmac-signature-generator"
toolCta: "Try the HMAC Generator"
---

Webhooks are how modern APIs push real-time events to your server: a payment succeeded, a pull request was opened, a subscription was cancelled. But here is the problem every backend developer faces eventually — **anyone on the internet can POST JSON to your webhook URL**. Without verification, an attacker can forge fake events and trick your application into taking dangerous actions.

That is exactly why services like Stripe, GitHub, Shopify, and Slack sign their webhook payloads with **HMAC** (Hash-based Message Authentication Code). If you verify the signature correctly, you know the request genuinely came from the provider and was not tampered with in transit.

This guide walks through how HMAC webhook verification works, common pitfalls, and practical implementation patterns you can use today.

## What problem does HMAC solve?

Imagine your `/webhooks/payments` endpoint receives this JSON:

```json
{ "order_id": "ord_123", "status": "paid", "amount": 4999 }
```

Your code marks the order as paid and ships the product. Now an attacker sends:

```json
{ "order_id": "ord_123", "status": "refunded", "amount": 4999 }
```

Without authentication, your server cannot tell the difference between a legitimate event and a forged one. A bare [SHA-256 hash](/blog/sha256-vs-sha512-which-hash-to-use) of the body is not enough either — an attacker who sees `hash(body)` can recompute the hash for a modified body.

HMAC fixes this by mixing the payload with a **shared secret** only you and the provider know:

```
signature = HMAC-SHA256(secret, raw_request_body)
```

Because the attacker does not have your webhook secret, they cannot produce a valid signature for forged data.

## How webhook providers send signatures

Each provider puts the signature in an HTTP header, but the exact format differs:

| Provider | Header | Algorithm |
| --- | --- | --- |
| Stripe | `Stripe-Signature` | HMAC-SHA256 |
| GitHub | `X-Hub-Signature-256` | HMAC-SHA256 |
| Shopify | `X-Shopify-Hmac-SHA256` | HMAC-SHA256 |
| Slack | `X-Slack-Signature` | HMAC-SHA256 |

The critical rule across all of them: **always verify against the raw request body bytes**, not a re-serialized JSON object. Parsing JSON and stringifying it again can change whitespace, key order, or Unicode escaping — producing a different HMAC and causing false rejections (or worse, false acceptances if implemented incorrectly).

## Step-by-step: verifying any HMAC webhook

Regardless of provider, the verification flow is the same:

1. **Read the raw body** as a string or Buffer before any JSON parsing.
2. **Extract the signature** from the provider's header.
3. **Compute HMAC** using your webhook secret and the same hash algorithm (usually SHA-256).
4. **Compare** your computed value to the provided signature using a **timing-safe** comparison.
5. **Only then** parse the JSON and process the event.

Never skip step 4's timing-safe comparison. A naive `===` string compare can leak information through timing side channels.

## Stripe webhook verification (Node.js)

Stripe's `Stripe-Signature` header contains a timestamp (`t`) and one or more signatures (`v1`). You should also reject events with timestamps too far in the past to prevent replay attacks.

```js
const crypto = require('crypto');

function verifyStripeWebhook(rawBody, signatureHeader, secret) {
  const parts = Object.fromEntries(
    signatureHeader.split(',').map(p => p.split('='))
  );

  const timestamp = parts.t;
  const signature = parts.v1;

  // Reject replays older than 5 minutes
  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (age > 300) {
    throw new Error('Webhook timestamp too old');
  }

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');

  const expectedBuf = Buffer.from(expected, 'hex');
  const actualBuf = Buffer.from(signature, 'hex');

  if (expectedBuf.length !== actualBuf.length) {
    throw new Error('Invalid signature');
  }

  if (!crypto.timingSafeEqual(expectedBuf, actualBuf)) {
    throw new Error('Invalid signature');
  }

  return JSON.parse(rawBody);
}
```

In Express, disable the default JSON body parser for your webhook route and use `express.raw({ type: 'application/json' })` so you preserve the exact bytes Stripe signed.

## GitHub webhook verification (Node.js)

GitHub sends `X-Hub-Signature-256` in the format `sha256=<hex_digest>`.

```js
function verifyGitHubWebhook(rawBody, signatureHeader, secret) {
  if (!signatureHeader?.startsWith('sha256=')) {
    throw new Error('Missing or invalid signature header');
  }

  const provided = signatureHeader.slice('sha256='.length);
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');

  const expectedBuf = Buffer.from(expected, 'hex');
  const actualBuf = Buffer.from(provided, 'hex');

  if (expectedBuf.length !== actualBuf.length) {
    throw new Error('Invalid signature');
  }

  if (!crypto.timingSafeEqual(expectedBuf, actualBuf)) {
    throw new Error('Invalid signature');
  }

  return JSON.parse(rawBody);
}
```

When configuring your GitHub webhook, choose **"Secret"** and store that value in an environment variable — never hardcode it in source control.

## Debugging HMAC signatures during development

When a signature check fails in development, the cause is almost always one of these:

1. **Wrong secret** — using the API key instead of the webhook signing secret.
2. **Modified body** — middleware parsed JSON before your verifier ran.
3. **Wrong encoding** — treating a Buffer as UTF-8 when the provider signed raw bytes.
4. **Wrong algorithm** — verifying SHA-256 when the provider sent SHA-1 (GitHub supports both; prefer SHA-256).
5. **Header format** — forgetting Stripe's `timestamp.body` prefix or GitHub's `sha256=` prefix.

Use Cipherly's [HMAC generator](/tools/hmac-signature-generator) to manually compute expected signatures while debugging. Paste your test payload and secret, select SHA-256, and compare the output to what your server computes. Because Cipherly runs entirely in your browser, your webhook secret never leaves your device.

## Security best practices

### Store secrets in environment variables

```bash
STRIPE_WEBHOOK_SECRET=whsec_...
GITHUB_WEBHOOK_SECRET=your-random-secret
```

Rotate secrets immediately if you suspect they were exposed in logs, screenshots, or a public repository.

### Return generic error responses

Respond with `400` for invalid signatures, but avoid leaking whether the timestamp, format, or HMAC itself failed. Attackers should not get a debugging roadmap.

### Make webhook handlers idempotent

Even with perfect verification, networks retry. The same `payment_intent.succeeded` event may arrive twice. Use the provider's event ID as an idempotency key before fulfilling orders or granting access.

### Use HTTPS only

Webhook secrets and payloads travel over the network. Terminate TLS at your load balancer or application and reject plain HTTP webhook endpoints in production.

## HMAC vs JWT for webhooks

Some APIs use [JWTs](/blog/common-jwt-vulnerabilities) instead of raw HMAC headers. The principle is the same — verify a cryptographic signature before trusting the payload — but the parsing differs. HMAC webhooks are simpler: one secret, one hash, one header. JWT webhooks add algorithm negotiation risks (`alg: none` attacks) if you roll your own verifier.

For HMAC-based providers, stick to their official SDK verification methods in production. Write your own verifier only when you understand the exact signing format.

## Common mistakes that leave you vulnerable

1. **Verifying after JSON.parse** — always sign-check the raw body first.
2. **Logging the full webhook secret** — redact secrets in application logs.
3. **Skipping replay protection** — validate timestamps where the provider supports it.
4. **Processing before verifying** — return early on bad signatures; never enqueue unverified events.
5. **Using MD5 or SHA-1** — if a provider still supports legacy algorithms, prefer SHA-256. See [why MD5 is broken](/blog/why-stop-using-md5).

## The bottom line

HMAC webhook verification is not optional for production APIs. It is the difference between a payment system that only fulfills real orders and one that can be tricked by a single forged HTTP request.

The pattern is always the same: raw body, shared secret, HMAC-SHA256, timing-safe compare. Master that once and you can integrate Stripe, GitHub, Shopify, and dozens of other providers with confidence.

---

**Next read:** [What is HMAC? Understanding Hash-Based Message Authentication](/blog/what-is-hmac-authentication)
