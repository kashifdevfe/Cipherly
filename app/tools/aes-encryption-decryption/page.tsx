import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Lock } from 'lucide-react';

const EncryptPanel = dynamic(() => import('@/components/AesEncryptPanel'));
const DecryptPanel = dynamic(() => import('@/components/AesDecryptPanel'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Secure AES-256 Encryption & Decryption Online | Cipherly",
  description: "Encrypt and decrypt text using AES-256 online. Professional-grade security with 100% browser-based processing. No data stored or transmitted.",
  keywords: ["aes encryption online", "aes-256 tool free", "encrypt text aes online", "aes decryption tool", "secure messaging online"],
  openGraph: {
    title: "Secure AES-256 Encryption & Decryption Online | Cipherly",
    description: "Encrypt and decrypt text using AES-256 online. Professional-grade security with 100% browser-based processing.",
    type: "website",
    url: "https://cipherlyapp.com/tools/aes-encryption-decryption",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipherly | Secure AES-256 Text Encryption",
    description: "Encrypt your sensitive messages with military-grade AES-256 directly in your browser. Private and secure.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/aes-encryption-decryption" },
};

export default function AesPage() {
  const jsonLd = {
    
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cipherly AES Encryption Tool",
    "description": "Encrypt and decrypt text using AES-256 locally in your browser.",
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
      "name": "Is AES-256 encryption safe to use online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, AES-256 is considered military-grade and is mathematically secure against brute-force attacks. However, you should only use tools like Cipherly that perform encryption entirely in your browser to ensure your keys are never sent to a server."
      }
    }, {
      "@type": "Question",
      "name": "Can Cipherly see my encryption key or plain text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Cipherly uses a zero-knowledge architecture. All encryption and decryption happen locally in your browser using the Web Crypto API. We have no backend access to your data."
      }
    }, {
      "@type": "Question",
      "name": "What is the difference between AES-GCM and AES-CBC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GCM (Galois/Counter Mode) provides both confidentiality and data integrity, while CBC (Cipher Block Chaining) only provides confidentiality. GCM is generally recommended for modern applications."
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Secure AES-256 Encryption & Decryption Online</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional-grade AES tools. All processing is 100% client-side.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass rounded-[2.5rem] p-6 md:p-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-black tracking-tighter uppercase">Encrypt</h2>
              </div>
              <EncryptPanel />
            </div>

            <div className="glass rounded-[2.5rem] p-6 md:p-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2.5 bg-secondary rounded-xl">
                  <div className="w-5 h-5 border-2 border-muted-foreground/30 rounded-md" />
                </div>
                <h2 className="text-2xl font-black tracking-tighter uppercase">Decrypt</h2>
              </div>
              <DecryptPanel />
            </div>
          </div>

          {/* Educational Content Section */}
          <section className="mt-20 max-w-4xl mx-auto prose prose-emerald dark:prose-invert">
            <h2>What is AES-256 Encryption?</h2>
            <p>
              Advanced Encryption Standard (AES) with a 256-bit key is the industry-standard algorithm used by governments and security experts worldwide to protect sensitive data. AES-256 is a symmetric-key algorithm, meaning the same secret key is used for both encryption and decryption. This specific implementation provides military-grade security that is currently considered resistant to brute-force attacks by modern supercomputers. Using an AES-256 encryption online tool allows you to transform plain text into unreadable ciphertext, ensuring that only those with the correct password or key can access the original message.
            </p>
            
            <h2>When should you use AES encryption?</h2>
            <p>
              You should use this free AES encryption tool whenever you need to store or transmit sensitive information over insecure channels. It is ideal for encrypting personal notes, passwords, or configuration files before saving them to cloud storage. Because our tool is browser-based, you don't need to install complex software to achieve high-level privacy. A key best practice is to always use a strong, unique password for the encryption key, as the security of the ciphertext depends entirely on the secrecy of the key. Cipherly ensures your privacy by performing all cryptographic operations locally; no data stored or transmitted to our servers during the process.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
