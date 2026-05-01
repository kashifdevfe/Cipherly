import { Metadata } from 'next';
import ClientPage from '@/components/ClientPage';
import TrustBadges from '@/components/TrustBadges';
import ToolDirectory from '@/components/ToolDirectory';
import Hero from '@/components/Hero';

export const metadata: Metadata = {
  title: "Professional Cyber Security Toolkit | AES, RSA, JWT & Bcrypt Online",
  description: "The ultimate all-in-one security toolkit. Securely encrypt text with AES-256, generate RSA keys, debug JWT tokens, and hash passwords with Bcrypt. 100% private, browser-native cryptographic tools.",
  keywords: [
    "cyber security toolkit", "aes encryption online", "rsa key generator", 
    "jwt debugger online", "bcrypt hash generator", "md5 sha256 sha512", 
    "base64 hmac generator", "web crypto api tools", "private encryption",
    "secure text tools", "developer security tools", "all-in-one crypto tool"
  ],
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Cipherly Security Toolkit",
    "description": "Professional all-in-one cryptographic toolkit. AES, RSA, JWT, Bcrypt, and more.",
    "url": "https://cipherly.app",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Advanced AES-256 (GCM/CBC/CTR/ECB)",
      "RSA Key Generation & Crypto",
      "JWT Debugging & Validation",
      "Bcrypt & Hash Generation",
      "HMAC & Base64 Tools",
      "100% Browser-Native Privacy"
    ]
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <Hero />
        
        <ClientPage />

        <div className="mt-40">
          <TrustBadges />
        </div>

        <div className="mt-40">
          <ToolDirectory />
        </div>

        <section className="mt-40 max-w-4xl mx-auto prose prose-emerald">
          <h2 className="text-3xl font-black tracking-tight text-center mb-12 uppercase text-primary">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 not-prose">
            {[
              {
                q: "Is Cipherly safe for production data?",
                a: "Yes. Cipherly uses the browser's native Web Crypto API. All operations occur in your device's memory. No data is sent to our servers, ever."
              },
              {
                q: "Which encryption mode is best?",
                a: "For general text, AES-GCM is highly recommended. It provides both confidentiality and integrity, making it the industry standard."
              },
              {
                q: "What is the difference between Hashing and Encryption?",
                a: "Encryption is two-way (can be decrypted with a key). Hashing is one-way (cannot be reversed), making it ideal for passwords."
              },
              {
                q: "Can I use Cipherly offline?",
                a: "Yes. Once the site is loaded, all tools work offline as they rely solely on your browser's processing power."
              }
            ].map((faq, i) => (
              <div key={i} className="space-y-3">
                <h3 className="font-bold text-lg text-foreground border-l-4 border-primary pl-4">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
