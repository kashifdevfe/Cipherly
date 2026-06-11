import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "How to Use AES Encryption for Beginners: Step-by-Step Guide | Cipherly Blog",
  description: "Complete beginner's guide to AES encryption. Learn how to encrypt and decrypt text using AES-256, best practices, and when to use it.",
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
          <h1 className="text-5xl font-black tracking-tighter">How to Use AES Encryption for Beginners</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-bold">Cipherly Team</span>
            <span>•</span>
            <span>May 2026</span>
            <span>•</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Tutorial</span>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">What is AES Encryption?</h2>
            <p>
              AES (Advanced Encryption Standard) is the most widely used symmetric encryption algorithm in the world. 
              It's used by governments, banks, and tech companies to protect sensitive information.
            </p>
            <p>
              As a beginner, the most important thing to know is that AES is symmetric, which means the same secret key or password is used for both encrypting and decrypting data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Step 1: Choose Your AES Mode</h2>
            <p>
              There are different modes of AES encryption. For most people, we recommend using <strong>AES-GCM</strong>, as it provides both confidentiality and integrity:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>GCM</strong> – Best for general use (confidentiality + integrity</li>
              <li><strong>CBC</strong> – Legacy mode (confidentiality only)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Step 2: Encrypt Your Text (5 Simple Steps</h2>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li><strong>Go to the AES tool</strong> – Navigate to the <Link href="/tools/aes-encryption-decryption" className="font-semibold text-primary hover:underline">AES encryption tool</Link></li>
              <li><strong>Enter your plaintext</strong> – Type or paste the text you want to encrypt</li>
              <li><strong>Choose a strong password</strong> – Use something long and random for maximum security</li>
              <li><strong>Select AES-GCM mode</strong> – This is the default and recommended mode</li>
              <li><strong>Click encrypt</strong> – That's it! Your encrypted text (ciphertext) will appear</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Step 3: Decrypt Your Text</h2>
            <p>
              Decrypting is just as easy:
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li><strong>Paste your ciphertext</strong> – Enter the encrypted text you want to decrypt</li>
              <li><strong>Enter the same password</strong> – You must use the exact same password you used for encryption</li>
              <li><strong>Select the same mode</strong> – Make sure you're using the same AES mode (GCM, CBC, etc.)</li>
              <li><strong>Click decrypt</strong> – Your original text will appear!</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Step 4: Best Practices for Beginners</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Use long passwords</strong> – Longer is always better. Aim for 12+ characters</li>
              <li><strong>Never reuse passwords</strong> – Use different passwords for different things</li>
              <li><strong>Keep passwords offline</strong> – Store your passwords in a password manager</li>
              <li><strong>Use GCM mode</strong> – It's the most secure for everyday use</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-foreground">Can I encrypt images or files?</h4>
                <p className="text-sm">Yes! While the AES tool primarily handles text, you can convert small files (like images) into a Base64 string using our <Link href="/tools/base64-encode-decode" className="text-primary hover:underline">Base64 tool</Link> and then encrypt that text string.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground">Is AES-256 breakable?</h4>
                <p className="text-sm">No. AES-256 has never been broken in practice. It's considered military-grade encryption. The only way an attacker can decrypt your data is if they guess your password or steal your key.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground">What happens if I lose my password?</h4>
                <p className="text-sm">If you forget the password you used to encrypt the text, the data is permanently lost. There is no "forgot password" button or backdoor recovery mechanism in real cryptography. Always store your encryption passwords securely in a password manager.</p>
              </div>
              <div>
                <h4 className="font-bold text-foreground">What is the difference between Encryption and Hashing?</h4>
                <p className="text-sm">Encryption (like AES) is a two-way street; data is scrambled but can be unscrambled if you have the key. Hashing (like SHA-256 or Bcrypt) is a one-way street; data is scrambled permanently and cannot be reversed. Hashing is used to verify data integrity or store passwords, while encryption is used to hide data that needs to be read later.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 p-6 bg-primary/5 border border-primary/20 rounded-lg">
            <h2 className="text-xl font-bold text-foreground">Ready to Try It?</h2>
            <p>
              Now that you know how AES works, give it a try with Cipherly. Everything happens in your browser—your keys never leave your device.
            </p>
            <Link
              href="/tools/aes-encryption-decryption"
              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try AES Encryption
            </Link>
          </section>
        </div>
      </div>
    </article>
  );
}
