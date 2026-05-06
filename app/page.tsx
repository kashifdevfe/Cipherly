import { Metadata } from 'next';
import ClientPage from '@/components/ClientPage';
import TrustBadges from '@/components/TrustBadges';
import ToolDirectory from '@/components/ToolDirectory';
import Hero from '@/components/Hero';

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Free Online Encryption Tools — Secure AES, RSA & JWT | Cipherly",
  description: "Free online encryption tools. Securely use AES, RSA, JWT, and Bcrypt in your browser. 100% client-side, zero-knowledge architecture. No data stored.",
  keywords: [
    "free online encryption tools", "aes encryption online", "rsa key generator online", 
    "jwt debugger online", "bcrypt hash generator online", "sha256 hash generator", 
    "base64 encoder decoder", "secure hmac generator", "browser-based cryptography",
    "private encryption tools", "developer security toolkit", "zero knowledge crypto"
  ],
  openGraph: {
    title: "Free Online Encryption Tools — Secure AES, RSA & JWT | Cipherly",
    description: "Free online encryption tools. Securely use AES, RSA, JWT, and Bcrypt in your browser. 100% client-side, zero-knowledge architecture.",
    images: "/og-image.png",
    siteName: "Cipherly",
    type: "website",
    url: "https://cipherlyapp.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Encryption Tools — Secure AES, RSA & JWT | Cipherly",
    description: "Free online encryption tools. Securely use AES, RSA, JWT, and Bcrypt in your browser. 100% client-side, zero-knowledge architecture.",
    images: "/og-image.png",
    creator: "@cipherly",
  }
};

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Cipherly Security Toolkit",
    "description": "Professional all-in-one cryptographic toolkit. AES, RSA, JWT, Bcrypt, and more.",
    "url": "https://cipherlyapp.com",
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How secure is Cipherly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cipherly uses the industry-standard Web Crypto API. All operations occur in your device's memory. No data is sent to our servers, ever."
        }
      },
      {
        "@type": "Question",
        "name": "Which encryption mode is best?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For general text, AES-GCM is highly recommended. It provides both confidentiality and integrity."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Hashing and Encryption?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Encryption is two-way (can be decrypted with a key). Hashing is one-way."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use Cipherly offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Once the site is loaded, all tools work offline as they rely solely on your browser's processing power."
        }
      }
    ]
  };
  
  return (
    <>
      <script
        id="web-app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
                q: "How secure is Cipherly?",
                a: "Cipherly uses the industry-standard Web Crypto API. All operations occur in your device's memory. No data is sent to our servers, ever."
              },
              {
                q: "Which encryption mode is best?",
                a: "For general text, AES-GCM is highly recommended. It provides both confidentiality and integrity."
              },
              {
                q: "What is the difference between Hashing and Encryption?",
                a: "Encryption is two-way (can be decrypted with a key). Hashing is one-way."
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
