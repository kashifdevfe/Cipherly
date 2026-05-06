import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Base64HmacWrapper = dynamic(() => import('@/components/tools/encode/Base64HmacWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Free Online HMAC Generator - SHA-256/SHA-512 | Cipherly",
  description: "Generate secure HMAC signatures online using SHA-256 and SHA-512. Browser-based tool with no data stored. Verify message integrity.",
  keywords: ["hmac generator online", "hmac sha256 generator", "generate hmac signature", "verify hmac online"],
  openGraph: {
    title: "Free Online HMAC Generator - SHA-256/SHA-512 | Cipherly",
    description: "Generate secure HMAC signatures online using SHA-256 and SHA-512. Browser-based tool with no data stored.",
    type: "website",
    url: "https://cipherlyapp.com/tools/hmac-signature-generator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online HMAC Generator - SHA-256/SHA-512 | Cipherly",
    description: "Generate secure HMAC signatures online. 100% browser-based.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/hmac-signature-generator" },
};

export default function HmacPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What is the difference between Hashing and HMAC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hashing only provides data integrity. HMAC uses a secret key to provide both integrity and authenticity, proving the message came from someone who knows the key."
      }
    }, {
      "@type": "Question",
      "name": "Is my HMAC secret key safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Because Cipherly is a client-side tool, your secret key is never sent to our servers. It remains strictly in your browser's local environment."
      }
    }, {
      "@type": "Question",
      "name": "Which hash algorithm should I use with HMAC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HMAC-SHA256 is the industry standard for most web APIs and provides an excellent balance of security and performance."
      }
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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

          <section className="mt-20 max-w-4xl mx-auto prose prose-emerald dark:prose-invert">
            <h2>What is an HMAC Generator?</h2>
            <p>
              Hash-based Message Authentication Code (HMAC) is a specific type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. An HMAC generator online allows you to verify both the data integrity and the authenticity of a message simultaneously. By using a secret key, HMACs ensure that a message cannot be modified by an attacker without the key, making them more secure against certain types of attacks than simple hashing. It is a fundamental component of secure API authentication and webhooks.
            </p>
            
            <h2>When should you use HMAC?</h2>
            <p>
              HMACs are widely used in protocols like IPsec, SSH, and for securing communication with APIs (such as Amazon Web Services or Stripe). You should use this free online tool to generate or verify signatures when testing your API integrations or implementing secure messaging. It supports algorithms like HMAC-SHA256 and HMAC-SHA512 for maximum compatibility. To ensure your secret keys remain secret, Cipherly never sends your key or message to a server. Everything is calculated locally using the Web Crypto API, maintaining a zero-knowledge environment for your most sensitive cryptographic keys.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
