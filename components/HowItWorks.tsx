import { Shield, Key, Lock, Zap, EyeOff, FileText } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="space-y-12 py-4">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold">1. Enter your text</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Type or paste the message you want to secure. Our tool supports multi-line text and special characters.
          </p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Key className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold">2. Choose a secret key</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Provide a strong secret key. This key is used to lock and unlock your data. Never share it with anyone.
          </p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold">3. Encrypt & Save</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Click encrypt to generate the ciphertext. Only someone with your exact key and algorithm can read it.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-white/5">
        <article className="space-y-4">
          <h2 className="text-2xl font-bold">What is Text Encryption?</h2>
          <p className="text-muted-foreground">
            Text encryption is the process of converting readable information (plaintext) into an unreadable format (ciphertext) using a mathematical algorithm and a secret key. This ensures that even if the data is intercepted, it cannot be understood without the proper decryption key.
          </p>
          <p className="text-muted-foreground">
            Encryption is a fundamental pillar of digital privacy, used by governments, banks, and secure messaging apps to protect sensitive information from unauthorized access.
          </p>
        </article>

        <article className="space-y-4">
          <h2 className="text-2xl font-bold">What is AES-256?</h2>
          <p className="text-muted-foreground">
            Advanced Encryption Standard (AES) with a 256-bit key length is one of the most secure encryption methods available today. It is classified as "military-grade" and is the standard used by the U.S. government to protect classified information.
          </p>
          <p className="text-muted-foreground">
            A 256-bit key has 2^256 possible combinations, making it virtually impossible to break through brute-force attacks with current computing technology.
          </p>
        </article>
      </div>

      <section className="space-y-6 pt-8 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center">Encryption Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Key, title: "Use Strong Keys", desc: "Always use long, complex keys with a mix of letters, numbers, and symbols." },
            { icon: EyeOff, title: "Keep Keys Private", desc: "Never share your secret keys over insecure channels like email or chat." },
            { icon: Shield, title: "Use AES-256", desc: "Whenever possible, stick to AES-256 as it offers the highest level of security." },
            { icon: Lock, title: "Don't Reuse Keys", desc: "Use different secret keys for different types of sensitive data." },
            { icon: Zap, title: "Generate Randomly", desc: "Use our built-in key generator to create cryptographically secure keys." },
            { icon: FileText, title: "Verify Algorithm", desc: "Ensure you use the same algorithm for both encryption and decryption." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl bg-secondary/30 border border-border">
              <item.icon className="w-6 h-6 text-primary shrink-0" />
              <div>
                <h4 className="font-bold text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 pt-8 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            { q: "Is my data safe with Cipherly?", a: "Yes. All encryption and decryption happen entirely within your browser using JavaScript. Your plaintext and secret keys never leave your device and are never sent to our servers." },
            { q: "Can I recover my key if I lose it?", a: "No. Because we don't store any of your data or keys, we cannot recover them for you. If you lose your key, the encrypted data is lost forever." },
            { q: "What is the difference between AES-128 and AES-256?", a: "AES-256 uses a longer key (256 bits) than AES-128 (128 bits), making it significantly more resistant to brute-force attacks, though both are currently considered secure." },
            { q: "What should I do with the ciphertext?", a: "You can safely store the ciphertext in a text file, send it over email, or save it in a notes app. As long as you have the key, you can decrypt it later." },
            { q: "Are there any limits on the text size?", a: "The tool is limited by your browser's memory and performance. For extremely large files (several megabytes), the browser may slow down during processing." }
          ].map((faq, i) => (
            <div key={i} className="space-y-2">
              <h4 className="font-bold text-primary">Q: {faq.q}</h4>
              <p className="text-sm text-muted-foreground">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
