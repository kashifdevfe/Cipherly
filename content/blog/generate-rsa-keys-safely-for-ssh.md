---
title: "How to Generate and Store RSA Keys Safely for SSH"
description: "A practical guide to generating RSA SSH key pairs, choosing 4096-bit vs Ed25519, protecting private keys with passphrases, and avoiding common mistakes."
date: "2026-07-03"
category: "Tutorial"
author: "Cipherly Team"
toolLink: "/tools/rsa-key-generator"
toolCta: "Generate RSA Keys"
---

SSH keys are the keys to your servers — literally. A single leaked private key can give an attacker shell access to production infrastructure, databases, and deployment pipelines. Yet many developers generate keys once, never rotate them, skip passphrases for "convenience," and copy private keys between machines over unencrypted channels.

This guide covers how to generate RSA keys the right way, how they fit into SSH authentication, and the storage practices that keep your infrastructure safe.

## How SSH key authentication works

Traditional SSH login uses a password sent to the server on each connection. SSH key authentication replaces this with **asymmetric cryptography**:

1. You generate a **key pair**: a private key (secret) and a public key (shareable).
2. You copy the **public key** to the server's `~/.ssh/authorized_keys` file.
3. When you connect, the server sends a challenge that only your **private key** can answer.
4. Your SSH client proves identity without ever sending the private key over the network.

The private key never leaves your machine during authentication. This is fundamentally more secure than passwords, which are sent on every login and vulnerable to brute force if the server is exposed.

RSA is one of several algorithms SSH supports. Others include **Ed25519** (modern default on many systems) and **ECDSA**. RSA remains the most widely compatible choice, especially in enterprise environments and older systems.

## RSA key sizes: 2048-bit vs 4096-bit

When generating RSA keys for SSH, you choose a key length:

| Key size | Security level | Generation time | Recommendation |
| --- | --- | --- | --- |
| 2048-bit | Minimum acceptable | Fast | Legacy compatibility |
| 4096-bit | Strong margin | Slower | New keys in 2026 |

**NIST and industry guidance** treat 2048-bit RSA as secure through approximately 2030. For new keys in 2026, **4096-bit is the better default** unless you have a specific compatibility constraint with an older system that rejects large keys.

Ed25519 keys are smaller, faster, and equally secure for SSH — but if your organization or tooling requires RSA specifically, 4096-bit is the right choice.

## Generating RSA keys with OpenSSH

The standard tool on macOS and Linux:

```bash
ssh-keygen -t rsa -b 4096 -C "your.email@company.com" -f ~/.ssh/id_rsa_cipherly
```

You will be prompted for a passphrase. **Always set one.** A private key without a passphrase is a plaintext credential on your filesystem — any malware or person with access to your laptop gets instant server access.

The command creates two files:

- `id_rsa_cipherly` — your **private key** (never share, never commit to git)
- `id_rsa_cipherly.pub` — your **public key** (safe to copy to servers)

### Set correct permissions

```bash
chmod 600 ~/.ssh/id_rsa_cipherly
chmod 644 ~/.ssh/id_rsa_cipherly.pub
```

SSH refuses to use private keys that are readable by other users on the system.

## Generating RSA keys in the browser (for learning and testing)

For understanding how RSA key generation works — or creating test keys for local development — Cipherly's [RSA key generator](/tools/rsa-key-generator) creates 2048-bit or 4096-bit pairs entirely in your browser using the Web Crypto API.

**Important:** Browser-generated keys are fine for learning, local testing, and understanding the PEM format. For production server access, prefer `ssh-keygen` on a trusted machine, or your organization's approved key management process. Production keys should be generated in a controlled environment and never exposed to web pages.

The generator shows you the PEM-formatted public and private keys so you can see exactly what `ssh-keygen` produces under the hood.

## Installing your public key on a server

Copy your public key to the server (never the private key):

```bash
ssh-copy-id -i ~/.ssh/id_rsa_cipherly.pub user@your-server.com
```

Or manually append the `.pub` file contents to `~/.ssh/authorized_keys` on the server.

Connect using the specific key:

```bash
ssh -i ~/.ssh/id_rsa_cipherly user@your-server.com
```

Add to `~/.ssh/config` for convenience:

```
Host production
  HostName your-server.com
  User deploy
  IdentityFile ~/.ssh/id_rsa_cipherly
```

Then simply `ssh production`.

## Protecting private keys properly

### Use a passphrase

A passphrase encrypts your private key file at rest. When you connect, your SSH agent decrypts it in memory. If someone steals your laptop, they cannot use the key without the passphrase.

Add a passphrase to an existing unprotected key:

```bash
ssh-keygen -p -f ~/.ssh/id_rsa_cipherly
```

### Use ssh-agent

The agent holds decrypted keys in memory so you type your passphrase once per session:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa_cipherly
```

On macOS, add `UseKeychain yes` to `~/.ssh/config` to store the passphrase in Keychain.

### Never do these things

1. **Email or Slack your private key** — use proper secret sharing (1Password, Vault) if absolutely necessary.
2. **Commit private keys to Git** — add `*.pem`, `id_rsa`, and `id_rsa_*` (without `.pub`) to `.gitignore`. Scan repos with `git-secrets` or GitHub secret scanning.
3. **Copy private keys to shared servers** — each machine should have its own key pair, or use a centralized identity provider.
4. **Use the same key everywhere** — separate keys for personal, staging, and production.
5. **Leave private keys on CI runners permanently** — inject keys per-deployment from a secrets manager.

## RSA vs Ed25519 for new SSH keys

OpenSSH 6.5+ supports Ed25519, and many guides now recommend:

```bash
ssh-keygen -t ed25519 -C "your.email@company.com"
```

Ed25519 keys are shorter, faster to generate, and resistant to certain implementation pitfalls that have affected RSA in the past. However, RSA 4096 remains necessary when:

- Corporate policy mandates RSA
- Legacy hardware or appliances only accept RSA keys
- Compliance frameworks specify minimum RSA key lengths
- You need compatibility with systems that do not support Ed25519

For a deeper comparison of asymmetric algorithms, read [AES vs RSA: Which Should You Choose?](/blog/aes-vs-rsa-comparison) — SSH uses RSA for authentication, while AES typically encrypts the session after the key exchange.

## Key rotation: when and how

Rotate SSH keys when:

- A team member with key access leaves the organization
- You suspect a key may have been exposed (laptop stolen, accidental commit)
- A key is older than 12 months (good hygiene for production access)
- A vulnerability affects your key generation tooling

Rotation process:

1. Generate a new key pair.
2. Add the new public key to all servers (alongside the old one).
3. Verify you can connect with the new key.
4. Remove the old public key from `authorized_keys` on every server.
5. Delete the old private key securely.

Never delete the old key from servers before confirming the new one works.

## How RSA SSH keys relate to TLS

Both SSH and HTTPS use asymmetric cryptography, but for different purposes:

- **SSH RSA keys** authenticate *you* to a server.
- **TLS certificates** (often RSA or ECDSA signed by a CA) authenticate *the server* to your browser and establish an encrypted channel.

In the TLS handshake, RSA is sometimes used for the initial key exchange, after which [AES](/tools/aes-encryption-decryption) encrypts the actual data. This hybrid approach combines RSA's key distribution benefits with AES's speed — the same pattern described in our [RSA key pairs guide](/blog/rsa-key-pairs-beginners-guide).

## Troubleshooting common SSH key issues

**"Permissions are too open"** — run `chmod 600` on your private key file.

**"Server refused our key"** — verify the public key is in `authorized_keys` on the server, check file permissions (`chmod 700 ~/.ssh` and `chmod 600 authorized_keys`), and confirm you are connecting as the correct user.

**"Too many authentication failures"** — SSH tries every key in your agent. Specify the key with `-i` or limit `IdentitiesOnly yes` in config.

**Key works locally but not in CI** — ensure the CI secret stores the full PEM including `-----BEGIN` and `-----END` lines, with newlines preserved.

## The bottom line

RSA SSH keys are simple in concept but easy to mishandle in practice. Generate 4096-bit keys with `ssh-keygen`, protect them with passphrases, never share private keys, rotate on schedule, and use separate keys per environment.

For learning and test key generation, Cipherly's browser-based [RSA tool](/tools/rsa-key-generator) lets you explore PEM formats safely. For production server access, follow the OpenSSH workflow on a trusted machine and treat every private key like a root password — because that is effectively what it is.

---

**Next read:** [The Ultimate Guide to RSA Key Pairs for Beginners](/blog/rsa-key-pairs-beginners-guide)
