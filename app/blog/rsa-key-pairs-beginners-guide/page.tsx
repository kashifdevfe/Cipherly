import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "The Ultimate Guide to RSA Key Pairs for Beginners | Cipherly Blog",
  description: "Learn how RSA key pairs work, how to generate them, and how to use them securely for encryption and digital signatures.",
};

export default function BlogPost() {
  return (
    <article className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-bold">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Blog
          </Link>
          <h1 className="text-5xl font-black tracking-tighter">The Ultimate Guide to RSA Key Pairs for Beginners</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-bold">Cipherly Team</span>
            <span>•</span>
            <span>May 2026</span>
            <span>•</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Informational</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">What is RSA?</h2>
            <p>
              RSA (Rivest–Shamir–Adleman) is an asymmetric encryption algorithm that uses two keys: 
              a public key that you share with everyone, and a private key that you keep secret.
            </p>
            <p>
              Unlike symmetric encryption (where both parties have the same key), RSA solves the "key distribution problem" 
              by letting anyone encrypt data using your public key, but only you can decrypt it with your private key.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">How RSA Key Pairs Work</h2>
            <p>
              Imagine you have a special mailbox (public key) that anyone can drop letters into, 
              but only you have the key to open it (private key).
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li><strong>Generate a key pair</strong> – Create a public key (shareable) and private key (secret)</li>
              <li><strong>Share your public key</strong> – Post it on your website, email it, or tell people directly</li>
              <li><strong>Someone encrypts data with your public key</strong> – Anyone can do this</li>
              <li><strong>Only you can decrypt it</strong> – Using your private key</li>
              <li><strong>You can also sign messages</strong> – Prove you wrote something using your private key</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Why is RSA Secure?</h2>
            <p>
              RSA relies on the mathematical difficulty of factoring large numbers. Here's the simplified version:
            </p>
            <div className="bg-secondary/30 border border-border rounded-lg p-6 space-y-4">
              <p className="text-sm">
                <strong>Easy problem:</strong> Multiply two large prime numbers together: 61 × 53 = 3,233
              </p>
              <p className="text-sm">
                <strong>Hard problem:</strong> Given 3,233, find the original two prime numbers.
              </p>
              <p className="text-sm">
                For a computer to figure out your private key, it would need to factor your public key. 
                With a 2048-bit key, this would take longer than the age of the universe with current technology.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Key Sizes: 2048 vs 4096</h2>
            
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-foreground mb-2">2048-bit Keys</h4>
                <p className="text-sm mb-2">Currently considered secure and widely used. Recommended minimum for most applications.</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Fast generation and encryption/decryption</li>
                  <li>Sufficient security for the next 10+ years</li>
                  <li>Standard across most systems</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-foreground mb-2">4096-bit Keys</h4>
                <p className="text-sm mb-2">Even more secure, but slightly slower. Use for highly sensitive data with long-term requirements.</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Takes longer to generate and process</li>
                  <li>Better protection against future threats</li>
                  <li>Recommended for government/military use</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">How to Generate an RSA Key Pair</h2>
            <p>
              Generating an RSA key pair involves:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Choose two large random prime numbers (p and q)</li>
              <li>Multiply them together: n = p × q</li>
              <li>Calculate the totient: φ(n) = (p-1) × (q-1)</li>
              <li>Choose a public exponent (e) – usually 65,537</li>
              <li>Calculate the private exponent (d) using the formula: d × e ≡ 1 (mod φ(n))</li>
              <li>Your public key = (n, e)</li>
              <li>Your private key = (n, d)</li>
            </ol>
            <p className="text-sm italic mt-4 p-4 bg-secondary/30 rounded-lg">
              Don't worry about doing this manually! Cipherly's RSA generator does all this for you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Best Practices for RSA Keys</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Keep your private key private</strong> – Never share it, ever. Not with friends, not with support.</li>
              <li><strong>Back up your private key</strong> – If you lose it, all encrypted data becomes inaccessible.</li>
              <li><strong>Use 2048-bit minimum</strong> – 1024-bit is considered broken and should not be used.</li>
              <li><strong>Verify public keys</strong> – When receiving someone's public key, verify its authenticity.</li>
              <li><strong>Rotate keys periodically</strong> – Generate new key pairs every few years for maximum security.</li>
              <li><strong>Use a secure random generator</strong> – Keys must be generated with cryptographically secure randomness.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Common Mistakes to Avoid</h2>
            
            <div className="space-y-3">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-1">❌ Using weak keys</h4>
                <p className="text-sm">Always generate keys with adequate length (2048-bit minimum).</p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-1">❌ Storing private keys insecurely</h4>
                <p className="text-sm">Protect your private key like you'd protect a password to your bank account.</p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-1">❌ Assuming one key pair works for everything</h4>
                <p className="text-sm">Use different key pairs for different purposes or systems when possible.</p>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-1">❌ Sharing your private key "just once"</h4>
                <p className="text-sm">Never share your private key, not even temporarily. Generate a new pair instead.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Encryption vs. Digital Signatures</h2>
            <p>
              One of the most confusing parts of RSA for beginners is that the keys can be used in <em>reverse</em> to achieve two completely different goals. Let's break it down:
            </p>
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-foreground mb-2">Scenario 1: Encryption (Sending a secret)</h4>
                <p className="text-sm mb-2">Goal: You want to send a secret message to Alice so nobody else can read it.</p>
                <ol className="text-xs space-y-1 list-decimal list-inside ml-2">
                  <li>You get Alice's <strong>Public Key</strong>.</li>
                  <li>You encrypt the message with it.</li>
                  <li>Only Alice has the matching <strong>Private Key</strong>, so only she can decrypt and read it.</li>
                </ol>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-bold text-foreground mb-2">Scenario 2: Digital Signatures (Proving identity)</h4>
                <p className="text-sm mb-2">Goal: You want to send a public announcement, and prove to everyone that YOU wrote it.</p>
                <ol className="text-xs space-y-1 list-decimal list-inside ml-2">
                  <li>You write the message and "encrypt" a hash of it using your <strong>Private Key</strong>.</li>
                  <li>Anyone can decrypt this signature using your <strong>Public Key</strong>.</li>
                  <li>Because it successfully decrypted with your Public Key, they know mathematically it <em>must</em> have been encrypted by your Private Key. You just proved your identity!</li>
                </ol>
              </div>
            </div>
            <p>
              This dual capability is what makes RSA so powerful and why it forms the backbone of digital certificates and HTTPS.
            </p>
          </section>

          <section className="space-y-4 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h2 className="text-xl font-bold text-foreground">Generate Your First RSA Key Pair</h2>
            <p>
              Ready to create your own RSA keys? Cipherly makes it simple and secure. 
              All key generation happens in your browser—we never see your keys.
            </p>
            <Link 
              href="/tools/rsa-key-generator"
              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Generate RSA Keys Now
            </Link>
          </section>
        </div>
      </div>
    </article>
  );
}
