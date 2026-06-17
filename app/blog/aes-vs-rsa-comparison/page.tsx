import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: "AES vs RSA: Which Encryption Algorithm Should You Choose? | Cipherly Blog",
  description: "Understand the differences between AES and RSA encryption, when to use each, and why they're not competing standards.",
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
          <h1 className="text-5xl font-black tracking-tighter">AES vs RSA: Which Should You Choose?</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-bold">Cipherly Team</span>
            <span>•</span>
            <span>May 2026</span>
            <span>•</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Comparison</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Are AES and RSA Competitors?</h2>
            <p>
              Short answer: No. They solve different problems and are often used together, not as alternatives.
            </p>
            <p>
              This is a common misconception. Think of AES as the locks on your front door and RSA as the way you exchange keys with someone who might live far away. 
              You need both for complete security, but they do different jobs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Key Differences</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-bold text-foreground">Feature</th>
                    <th className="text-left p-3 font-bold text-foreground">AES</th>
                    <th className="text-left p-3 font-bold text-foreground">RSA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Type</td>
                    <td className="p-3">Symmetric (same key)</td>
                    <td className="p-3">Asymmetric (public/private key)</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Speed</td>
                    <td className="p-3">Very fast ⚡</td>
                    <td className="p-3">Slower 🐌</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Key Exchange</td>
                    <td className="p-3">Problem: How to share key securely?</td>
                    <td className="p-3">Solution: Share public key openly</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Encryption Size</td>
                    <td className="p-3">Can encrypt any size</td>
                    <td className="p-3">Limited by key size (2048/4096 bits)</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-medium">Use Case</td>
                    <td className="p-3">Encrypting large data</td>
                    <td className="p-3">Digital signatures & key exchange</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Key Length</td>
                    <td className="p-3">256 bits = unbreakable</td>
                    <td className="p-3">2048+ bits recommended</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">AES (Advanced Encryption Standard)</h2>
            <p>
              <strong>Symmetric encryption.</strong> You use the same secret key to both encrypt and decrypt. 
              It's like having one master key that opens and locks your safe.
            </p>
            <h4 className="font-bold text-foreground mt-4">Pros:</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Extremely fast – can encrypt gigabytes of data in seconds</li>
              <li>Uses shorter keys – 256-bit is military-grade secure</li>
              <li>No computational overhead – great for devices and real-time encryption</li>
            </ul>
            <h4 className="font-bold text-foreground mt-4">Cons:</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Key sharing problem – how do you safely give the key to someone?</li>
              <li>Only works with one party – you need a different key for each person</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">RSA (Rivest–Shamir–Adleman)</h2>
            <p>
              <strong>Asymmetric encryption.</strong> You have two keys: a public key (share with anyone) and a private key (keep secret). 
              It's like having a mailbox (public key) anyone can post letters to, but only you have the key to open it (private key).
            </p>
            <h4 className="font-bold text-foreground mt-4">Pros:</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>No key sharing problem – give your public key to anyone</li>
              <li>Digital signatures – prove you wrote something without revealing your private key</li>
              <li>Works across networks – no need to meet in person</li>
            </ul>
            <h4 className="font-bold text-foreground mt-4">Cons:</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Much slower than AES – not practical for large data</li>
              <li>Needs longer keys – 2048-4096 bits for equivalent security to AES-256</li>
              <li>More computational power required</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">When to Use Each</h2>
            
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-bold text-emerald-400 mb-2">Use AES When:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Encrypting large files or large amounts of data</li>
                  <li>You need speed and efficiency</li>
                  <li>You've already securely shared a key with someone</li>
                  <li>Building an encrypted database</li>
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-bold text-blue-400 mb-2">Use RSA When:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>You need to exchange keys over insecure channels</li>
                  <li>Digitally signing documents (proving authorship)</li>
                  <li>Encrypting small amounts of data (like AES keys)</li>
                  <li>First contact with someone you haven't met before</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Real-World Example: Hybrid Encryption (HTTPS)</h2>
            <p>
              In practice, modern security systems almost never choose just one. They use a technique called <strong>Hybrid Encryption</strong>, which combines the best features of both algorithms to eliminate their respective weaknesses. The most common example of this is when you visit a secure website using HTTPS (TLS/SSL).
            </p>
            <p>
              Here is exactly how AES and RSA work together when your browser connects to your bank's website:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4 mb-4">
              <li><strong>The Handshake (RSA):</strong> Your browser connects to the bank's server. The server sends back its digital certificate, which contains its RSA Public Key.</li>
              <li><strong>The Secret Generation:</strong> Your browser verifies the certificate, then generates a completely random, temporary secret key (a "Session Key").</li>
              <li><strong>The Secure Exchange (RSA):</strong> Your browser encrypts this Session Key using the bank's RSA Public Key and sends it back to the server. Because only the bank has the matching RSA Private Key, only the bank can decrypt it. Now, both your browser and the server share the same secret Session Key, and nobody listening to the network could have intercepted it.</li>
              <li><strong>The Bulk Transfer (AES):</strong> The slow RSA algorithm is immediately discarded for the rest of the session. Both your browser and the server now switch to AES using the shared Session Key. All your passwords, account balances, and clicking data are encrypted and decrypted using AES at blazing fast speeds.</li>
            </ol>
            <p>
              By combining them, you get the secure key exchange of RSA without sacrificing the high-speed performance of AES.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">The Future: Quantum Computing Threats</h2>
            <p>
              As we look toward the future, the emergence of quantum computers poses different threats to these two algorithms.
            </p>
            <p>
              <strong>RSA is highly vulnerable.</strong> The security of RSA relies on the difficulty of factoring large prime numbers. A theoretical algorithm known as Shor's Algorithm, running on a sufficiently powerful quantum computer, could solve this math problem efficiently. This means all current RSA keys (even 4096-bit) will eventually be easily broken by quantum computers. Cryptographers are actively working on Post-Quantum Cryptography (PQC) algorithms to replace RSA.
            </p>
            <p>
              <strong>AES is largely quantum-resistant.</strong> AES relies on different mathematical principles. While a quantum algorithm called Grover's Algorithm could theoretically halve the effective security of an AES key, it doesn't break the underlying math. To protect AES against quantum computers, you simply double the key size. This is why AES-256 (which offers 128 bits of post-quantum security) is considered safe from quantum threats for the foreseeable future.
            </p>
          </section>

          <section className="space-y-4 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h2 className="text-xl font-bold text-foreground">Try Both in Cipherly</h2>
            <p>
              Want to see AES and RSA in action? Cipherly lets you experiment with both:
            </p>
            <div className="flex gap-4 mt-4">
              <Link 
                href="/tools/aes-encryption-decryption"
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors text-center"
              >
                Try AES Encryption
              </Link>
              <Link 
                href="/tools/rsa-key-generator"
                className="flex-1 px-6 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-colors text-center"
              >
                Try RSA Keys
              </Link>
            </div>
          </section>
          
          <AuthorBio />
        </div>
      </div>
    </article>
  );
}
