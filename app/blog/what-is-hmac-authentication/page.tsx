import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: "What is HMAC? Understanding Hash-Based Message Authentication Codes | Cipherly Blog",
  description: "Learn how HMAC authentication works, why it's critical for API security and webhooks, and how to generate secure HMAC signatures.",
};

export default function BlogPost() {
  return (
    <article className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="space-y-12">
        <div className="space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-bold">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Blog
          </Link>
          <h1 className="text-5xl font-black tracking-tighter">What is HMAC? Understanding Hash-Based Message Authentication</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-bold">Cipherly Team</span>
            <span>•</span>
            <span>May 2026</span>
            <span>•</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Security</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">The Problem with Simple Hashes</h2>
            <p>
              Imagine you are building a webhook system. Your server needs to send a notification to a client whenever a payment is processed. You decide to send the data as a JSON payload: <code>{"{"}"payment_id": 123, "status": "paid"{"}"}</code>.
            </p>
            <p>
              To ensure the data isn't tampered with in transit, you might think to include a <Link href="/tools/online-hash-generator" className="text-primary hover:underline">SHA-256 hash</Link> of the payload. But there's a fatal flaw: an attacker acting as a man-in-the-middle could intercept the request, change the status to <code>"refunded"</code>, calculate a <em>new</em> SHA-256 hash, and send the modified payload to the client. The client would see that the payload matches the hash, completely unaware of the tampering.
            </p>
            <p>
              Standard hashes provide <em>integrity</em> against accidental corruption, but they do not provide <em>authenticity</em> against malicious tampering. This is exactly the problem HMAC solves.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Enter HMAC</h2>
            <p>
              HMAC stands for <strong>Hash-based Message Authentication Code</strong>. It is a specific type of MAC involving a cryptographic hash function and a secret cryptographic key.
            </p>
            <p>
              By combining the data payload with a secret key known only to the sender and the receiver, HMAC ensures two things simultaneously:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li><strong>Integrity:</strong> The message has not been altered in transit.</li>
              <li><strong>Authenticity:</strong> The message definitely came from someone who possesses the secret key.</li>
            </ol>
            <p>
              Because the attacker does not know the secret key, they cannot calculate a valid HMAC for their forged <code>"refunded"</code> payload. When the client receives the forged payload, the HMAC validation will fail, and the request will be rejected.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">How HMAC Works (The Math)</h2>
            <p>
              You might wonder, why not just append the secret to the message and hash it together? Like this: <code>Hash(Key + Message)</code>.
            </p>
            <p>
              Early attempts at MACs did exactly this, but it led to a vulnerability known as a <strong>length extension attack</strong>. If an attacker sees <code>Hash(Key + Message)</code>, certain hash functions (like MD5, SHA-1, and SHA-256) allow the attacker to append extra data and calculate a valid <code>Hash(Key + Message + ExtraData)</code> without ever knowing the key.
            </p>
            <p>
              HMAC fixes this by hashing the data <em>twice</em> with mathematical padding. The exact formula is:
            </p>
            <div className="bg-secondary/30 border border-border p-4 rounded-lg font-mono text-sm text-center">
              HMAC(K, m) = H((K ⊕ opad) ∥ H((K ⊕ ipad) ∥ m))
            </div>
            <p className="text-sm italic mt-2 text-center">
              Where H is the hash function, K is the key, m is the message, ⊕ is XOR, ∥ is concatenation, and opad/ipad are specific padding constants.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Common Use Cases for HMAC</h2>
            <ul className="list-disc list-inside space-y-4 ml-4 mt-4">
              <li>
                <strong>Webhooks (Stripe, GitHub, etc.):</strong> When these services send data to your servers, they include an HMAC signature in the HTTP headers (e.g., <code>Stripe-Signature</code>). Your server uses your webhook secret to calculate the HMAC of the incoming payload. If it matches the header, you know Stripe sent it.
              </li>
              <li>
                <strong>JSON Web Tokens (JWTs):</strong> When a JWT is signed using symmetric encryption (algorithms like HS256), the signature portion of the token is literally an HMAC-SHA256 signature of the header and payload.
              </li>
              <li>
                <strong>Amazon Web Services (AWS) API Requests:</strong> Every API request you send to AWS must be signed using AWS Signature Version 4, which heavily relies on nested HMAC-SHA256 calculations using your AWS Secret Key.
              </li>
            </ul>
          </section>

          <section className="space-y-4 p-6 bg-primary/5 border border-primary/20 rounded-lg mt-8">
            <h2 className="text-xl font-bold text-foreground">Generate an HMAC Signature</h2>
            <p>
              Do you need to generate a test HMAC signature to verify your webhook logic? Or debug a JWT signature? Use Cipherly's native HMAC generator tool to instantly create signatures using algorithms like SHA-256 and SHA-512.
            </p>
            <Link 
              href="/tools/hmac-signature-generator"
              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try the HMAC Generator
            </Link>
          </section>

          <AuthorBio />
        </div>
      </div>
    </article>
  );
}
