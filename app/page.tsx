import { Metadata } from 'next';
import Script from 'next/script';
import { Cpu, Fingerprint, ShieldCheck, Sparkles } from 'lucide-react';
import ClientPage from '@/components/ClientPage';
import TrustBadges from '@/components/TrustBadges';
import ToolDirectory from '@/components/ToolDirectory';
import Hero from '@/components/Hero';
import AdUnit from '@/components/AdUnit';

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Free Online Encryption Tools | AES, RSA & JWT",
  description: "Secure browser-based AES, RSA, JWT, and Bcrypt tools with zero-knowledge privacy. All operations happen locally in your browser.",
  keywords: [
    "free online encryption tools", "aes encryption online", "rsa key generator online", 
    "jwt debugger online", "bcrypt hash generator online", "sha256 hash generator", 
    "base64 encoder decoder", "secure hmac generator", "browser-based cryptography",
    "private encryption tools", "developer security toolkit", "zero knowledge crypto"
  ],
  openGraph: {
    title: "Free Online Encryption Tools | AES, RSA & JWT | Cipherly",
    description: "Secure browser-based AES, RSA, JWT, and Bcrypt tools with zero-knowledge privacy.",
    images: "/og-image.png",
    siteName: "Cipherly",
    type: "website",
    url: "https://cipherlyapp.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Encryption Tools | AES, RSA & JWT | Cipherly",
    description: "Secure browser-based AES, RSA, JWT, and Bcrypt tools with zero-knowledge privacy.",
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
      <Script
        id="web-app-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-12 md:py-20">
        <Hero />
        
        <ClientPage />

        <div className="mt-40">
          <AdUnit slot="1234567890" format="horizontal" />
          <TrustBadges />
        </div>

        <div className="mt-40">
          <ToolDirectory />
        </div>

        <section className="mt-24">
          <div className="glass rounded-[2rem] border border-primary/10 p-8 md:p-12 shadow-xl shadow-primary/10">
            <div className="max-w-5xl mx-auto space-y-10">
              <div className="text-center">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                  Privacy-first cryptography
                </span>
                <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  Why It Matters That Your Crypto Tools Run Locally
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                  Every operation in Cipherly happens inside your browser, not on a remote server. That means your keys, tokens, and plaintext stay under your control, while network exposure and external storage are eliminated.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,156,0.12),transparent_40%)] p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">Zero-knowledge security</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    AES, RSA, JWT, Bcrypt and HMAC are all calculated locally. No raw input is transmitted to our infrastructure, which preserves the true meaning of private cryptography.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),transparent_45%)] p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <Fingerprint className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">Intentional toolset</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Cipherly combines essential workflows into one unified interface: encryption, decryption, token inspection, signing, hashing, and encoding. That means fewer context switches and more consistent security.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,255,156,0.1),transparent_45%)] p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">Browser-native performance</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    Modern browsers provide fast cryptographic primitives. Cipherly leverages that native power so you get instant results without service delays or upload bottlenecks.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,255,156,0.08),transparent_40%)] p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-foreground">Clear guidance</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    The app highlights the right algorithm for each job. AES-GCM for authenticated data, RSA for key exchange, HMAC for integrity, and Bcrypt for password hashing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit slot="1234567891" format="horizontal" />

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
