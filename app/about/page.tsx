import { Metadata } from 'next';
import { Zap, Shield, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: "About Cipherly | Free Cryptography Tools for Everyone",
  description: "Learn about Cipherly, a free, browser-native cryptographic toolkit built to make security tools accessible to everyone with zero-knowledge architecture.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl font-black tracking-tighter uppercase">About Cipherly</h1>
          <p className="text-xl text-muted-foreground font-medium italic max-w-2xl mx-auto">
            Making professional-grade cryptographic tools accessible to everyone, completely free, and 100% private.
          </p>
        </div>

        {/* Mission Section */}
        <div className="glass rounded-[2.5rem] p-12 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            At Cipherly, we believe that security and privacy should not be behind paywalls. 
            Our mission is to democratize access to professional-grade cryptographic tools by providing 
            a completely free, browser-native toolkit that anyone can use without worrying about their data being monitored, 
            sold, or stored on external servers.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We're committed to transparency, privacy, and security. Everything you encrypt stays encrypted—on your device, in your control.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          {[
            {
              icon: Shield,
              title: "Security First",
              desc: "We use industry-standard Web Crypto API and peer-reviewed cryptographic libraries. Your security is our top priority."
            },
            {
              icon: Zap,
              title: "Privacy by Design",
              desc: "Zero-knowledge architecture means we have zero access to your keys, passwords, or plaintext data. Ever."
            },
            {
              icon: Users,
              title: "Accessible to All",
              desc: "No signups, logins, or paywalls. Anyone with a browser and internet connection can use Cipherly immediately."
            },
            {
              icon: Heart,
              title: "Open Philosophy",
              desc: "We believe in the power of open standards and transparent security. No black boxes, no proprietary algorithms."
            }
          ].map((value, i) => (
            <div key={i} className="glass p-8 rounded-[2rem] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* What We Offer Section */}
        <div className="space-y-8 py-8 border-t border-border">
          <h2 className="text-3xl font-bold">What We Offer</h2>
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-secondary/30 border border-border space-y-2">
              <h4 className="font-bold text-lg">7 Professional Cryptographic Tools</h4>
              <p className="text-muted-foreground">
                AES Encryption, RSA Key Generation, JWT Debugging, Hash Generation, Bcrypt Password Hashing, Base64 Encoding, and HMAC Signature Generation.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-secondary/30 border border-border space-y-2">
              <h4 className="font-bold text-lg">100% Browser-Native Processing</h4>
              <p className="text-muted-foreground">
                All encryption and decryption happens in your browser. No data is sent to our servers. You can even disconnect from the internet after loading the site.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-secondary/30 border border-border space-y-2">
              <h4 className="font-bold text-lg">Educational Resources</h4>
              <p className="text-muted-foreground">
                Learn about cryptography with our comprehensive guides on encryption standards, best practices, and security principles.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-secondary/30 border border-border space-y-2">
              <h4 className="font-bold text-lg">Developer-Friendly</h4>
              <p className="text-muted-foreground">
                Built for developers who need quick, reliable crypto tools. Fast performance, clean interface, no distractions.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Details Section */}
        <div className="glass rounded-[2.5rem] p-12 space-y-6 border border-border">
          <h2 className="text-3xl font-bold">Technical Foundation</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cipherly is built on Next.js 16, React 19, and TypeScript for reliability and maintainability. 
            We leverage the Web Crypto API for all cryptographic operations, ensuring our tools comply with web security standards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-bold text-primary mb-2">Encryption Standards</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ AES-256 (GCM, CBC, CTR, ECB)</li>
                <li>✓ RSA 2048/4096-bit keys</li>
                <li>✓ SHA-256, SHA-512</li>
                <li>✓ Bcrypt with custom cost factors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-2">Technology Stack</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ Next.js 16 (App Router)</li>
                <li>✓ React 19</li>
                <li>✓ TypeScript 5</li>
                <li>✓ Tailwind CSS 4</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="glass rounded-[2.5rem] p-12 space-y-6 text-center border border-primary/20 bg-primary/5">
          <h2 className="text-3xl font-bold">Have Questions?</h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We're constantly improving Cipherly. If you have feedback, suggestions, or encounter any issues, 
            please don't hesitate to reach out through our community forums or contact channels.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="mailto:support@cipherlyapp.com" 
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
            >
              Email Support
            </a>
            <a 
              href="/privacy"
              className="px-6 py-3 rounded-lg border border-primary text-primary font-bold hover:bg-primary/10 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center space-y-2 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
            Free • Secure • Private • No Signup Required
          </p>
          <p className="text-[10px] text-muted-foreground">
            Cipherly © 2026. All cryptographic operations are performed locally in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
