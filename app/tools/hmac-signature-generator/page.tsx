import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ShieldCheck, Key, Lock, Sparkles } from 'lucide-react';

import ToolOverview from '@/components/ToolOverview';

const Base64HmacWrapper = dynamic(() => import('@/components/tools/encode/Base64HmacWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Secure HMAC Signature Generator Online | Cipherly",
  description: "Generate secure HMAC signatures online using SHA-256 and SHA-512. Professional browser-based integrity verification with no data stored.",
  keywords: ["hmac generator online", "hmac sha256 generator", "generate hmac signature", "verify hmac online", "message authentication code"],
  openGraph: {
    title: "Secure HMAC Signature Generator Online | Cipherly",
    description: "Generate secure HMAC signatures online using SHA-256 and SHA-512. Professional browser-based integrity verification.",
    type: "website",
    url: "https://cipherlyapp.com/tools/hmac-signature-generator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipherly | Online HMAC-SHA256 Generator",
    description: "Generate secure HMAC signatures for API authentication directly in your browser. Secret keys never leave your device.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/hmac-signature-generator" },
};

export default function HmacPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cipherly HMAC Generator",
    "description": "Generate secure HMAC signatures locally in your browser.",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What is the difference between Hashing and HMAC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hashing only provides data integrity (proving the data hasn't changed). HMAC (Hash-based Message Authentication Code) uses a secret key to provide both integrity and authenticity, proving that the message was created by someone who possesses the secret key."
      }
    }, {
      "@type": "Question",
      "name": "Is my HMAC secret key safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Because Cipherly is a 100% client-side tool, your secret key is never sent to our servers or stored anywhere. All cryptographic operations occur strictly within your browser's local environment, protecting your keys from network interception."
      }
    }, {
      "@type": "Question",
      "name": "Which hash algorithm should I use with HMAC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HMAC-SHA256 is currently the industry standard for most web APIs and authentication protocols. It provides an excellent balance of security and performance. For extremely high-security requirements, HMAC-SHA512 is also supported."
      }
    }]
  };

  return (
    <>
      <Script
        id="hmac-faq-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="hmac-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Secure HMAC Signature Generator Online</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Generate HMAC-SHA256 and HMAC-SHA512 signatures locally in your browser.
            </p>
          </div>

          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <Base64HmacWrapper defaultTab="hmac" />
          </div>

          <ToolOverview
            heading="Why HMAC should be generated locally"
            tagline="Create and verify HMAC signatures in the browser so shared secrets remain private."
            cards={[
              {
                title: 'Authenticated integrity',
                description: 'HMAC proves both message integrity and authenticity using a secret key.',
                icon: ShieldCheck,
              },
              {
                title: 'Secret key privacy',
                description: 'Your HMAC key never leaves the browser, keeping API signature secrets safe.',
                icon: Key,
              },
              {
                title: 'Protocol-ready',
                description: 'Use HMAC for secure API requests, webhooks, and integrity checks.',
                icon: Lock,
              },
              {
                title: 'Client-side verification',
                description: 'Verify signatures locally without sending data to a remote service.',
                icon: Sparkles,
              },
            ]}
          >
            <h2>What is an HMAC Generator?</h2>
            <p>
              Hash-based Message Authentication Code (HMAC) is a specific type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. An HMAC generator online allows you to verify both the data integrity and the authenticity of a message simultaneously. By using a secret key, HMACs ensure that a message cannot be modified by an attacker without the key, making them more secure against certain types of attacks than simple hashing. It is a fundamental component of secure API authentication and webhooks.
            </p>

            <h2>When should you use HMAC?</h2>
            <p>
              HMACs are widely used in protocols like IPsec, SSH, and for securing communication with APIs (such as Amazon Web Services or Stripe). You should use this free online tool to generate or verify signatures when testing your API integrations or implementing secure messaging. It supports algorithms like HMAC-SHA256 and HMAC-SHA512 for maximum compatibility. To ensure your secret keys remain secret, Cipherly never sends your key or message to a server. Everything is calculated locally using the Web Crypto API, maintaining a zero-knowledge environment for your most sensitive cryptographic keys.
            </p>
            <p>
              HMAC is often paired with hashing tools for key derivation and token signing. If you want to verify message integrity before applying an HMAC, try our <Link href="/tools/online-hash-generator" className="font-semibold text-primary hover:underline">hash generator</Link>. For secure token workflows, use HMAC signatures with the <Link href="/tools/jwt-decoder-validator" className="font-semibold text-primary hover:underline">JWT debugger</Link>.
            </p>
          </ToolOverview>
        </div>
      </div>
    </>
  );
}
