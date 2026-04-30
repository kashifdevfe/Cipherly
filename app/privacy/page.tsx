import { Metadata } from 'next';
import { Shield, EyeOff, Lock, ServerOff } from 'lucide-react';

export const metadata: Metadata = {
  title: "Privacy Policy | Cipherly Security Toolkit",
  description: "Our zero-knowledge privacy policy. We never see your data, keys, or passwords. 100% browser-native encryption.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="space-y-6 mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tighter uppercase">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground font-medium italic">
          "Your data is yours. We don't want it. We can't see it."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {[
          { 
            icon: ServerOff, 
            title: "Zero Server Processing", 
            text: "All cryptographic operations happen in your browser. Our servers never see your plain text or keys." 
          },
          { 
            icon: EyeOff, 
            title: "No Data Collection", 
            text: "We do not store, log, or transmit your sensitive information. There is no database of your secrets." 
          },
          { 
            icon: Lock, 
            title: "Open Cryptography", 
            text: "We use standard, peer-reviewed libraries and the Web Crypto API for all operations." 
          },
          { 
            icon: Shield, 
            title: "Client-Side Only", 
            text: "Once the app is loaded, you can even disconnect from the internet and continue encrypting." 
          }
        ].map((item, i) => (
          <div key={i} className="glass p-8 rounded-[2rem] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-[3rem] p-10 md:p-16 space-y-12 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">1. Information We Collect</h2>
          <p className="text-muted-foreground font-medium">
            Cipherly is designed to be a anonymous tool. We do not require account registration, 
            email addresses, or any personal identification. 
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
            <li>We do NOT collect your keys or plain text data.</li>
            <li>We do NOT track your personal identity.</li>
            <li>We use anonymous analytics (Google Analytics) to monitor site performance and traffic patterns.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">2. How Data is Processed</h2>
          <p className="text-muted-foreground font-medium">
            Unlike traditional web applications, Cipherly operates on a <strong>Zero-Knowledge Architecture</strong>. 
            When you enter a password or text to encrypt:
          </p>
          <div className="bg-secondary/30 border border-border p-6 rounded-2xl font-mono text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li>Text remains in your browser's RAM.</li>
              <li>Encryption is performed by your CPU via the Web Crypto API.</li>
              <li>The result is displayed on your screen.</li>
              <li>Nothing is sent to a server.</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">3. Third-Party Services</h2>
          <p className="text-muted-foreground font-medium text-sm">
            We use Google AdSense for monetization and Google Analytics for traffic analysis. 
            These services may use cookies to serve ads based on your visit to this site and other sites 
            on the Internet. These third parties have their own privacy policies.
          </p>
        </section>

        <section className="pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground font-bold uppercase tracking-widest">
          <span>Last Updated: April 30, 2026</span>
          <span>Version: 1.0.0 (Cyber Mint)</span>
        </section>
      </div>
    </div>
  );
}
