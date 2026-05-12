import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Key, ShieldCheck, Fingerprint, Sparkles } from 'lucide-react';

import ToolOverview from '@/components/ToolOverview';

const RsaToolWrapper = dynamic(() => import('@/components/tools/rsa/RsaToolWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Free RSA Key Generator & Encryption Tool | Cipherly",
  description: "Generate secure RSA public and private key pairs online. Professional 2048-bit and 4096-bit key generation. 100% browser-based security with no data transmitted.",
  keywords: ["rsa key generator online", "generate rsa keys online", "rsa public private key pair", "free rsa tool", "asymmetric encryption online"],
  openGraph: {
    title: "Free RSA Key Generator & Encryption Tool | Cipherly",
    description: "Generate secure RSA public and private key pairs online. Professional 2048-bit and 4096-bit key generation.",
    type: "website",
    url: "https://cipherlyapp.com/tools/rsa-key-generator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipherly | Free RSA Key Generator Online",
    description: "Generate 2048/4096-bit RSA keys securely in your browser. Private keys never leave your device.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/rsa-key-generator" },
};

export default function RsaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cipherly RSA Key Generator",
    "description": "Generate secure RSA public and private key pairs locally in your browser.",
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
      "name": "Should I use 2048-bit or 4096-bit RSA keys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2048-bit keys are currently the industry standard and offer robust security for most modern use cases, providing a good balance between security and performance. 4096-bit keys provide even higher security margins and are recommended for long-term data protection or extremely high-security environments, though they are significantly slower to process. Both lengths are fully supported by Cipherly's local generation tool."
      }
    }, {
      "@type": "Question",
      "name": "Where are my RSA keys generated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your RSA keys are generated entirely locally within your browser's memory using the native Web Crypto API. Unlike server-side generators, your private key is never transmitted over the network and is never seen by our servers. This zero-knowledge approach ensures that you are the sole owner of the generated cryptographic material."
      }
    }, {
      "@type": "Question",
      "name": "Can I use these RSA keys for SSH or SSL?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can use the generated keys for various purposes including SSH authentication, SSL/TLS certificates, and secure email (S/MIME). However, please note that you may need to convert the output into specific formats like OpenSSH or PEM depending on the requirements of your target application or server configuration."
      }
    }]
  };

  return (
    <>
      <Script
        id="rsa-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="rsa-faq-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Generate Secure RSA Key Pairs Online</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Create high-entropy RSA keys (2048/4096-bit) safely in your browser.
            </p>
          </div>

          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <RsaToolWrapper />
          </div>

          <ToolOverview
            heading="Why this RSA key generator is safer locally"
            tagline="Generate RSA key pairs directly in your browser so your private key never leaves your device."
            cards={[
              {
                title: 'Local key generation',
                description: 'Your RSA key pair is created entirely in browser memory, eliminating server-side key exposure.',
                icon: Key,
              },
              {
                title: 'Zero-knowledge privacy',
                description: 'The private key never leaves your machine, so you retain full control of your secrets.',
                icon: ShieldCheck,
              },
              {
                title: 'Trusted use cases',
                description: 'Use generated keys for SSH, TLS, and digital signatures with confidence.',
                icon: Fingerprint,
              },
              {
                title: 'Browser-native process',
                description: 'The Web Crypto API handles the math securely without uploading anything to a backend.',
                icon: Sparkles,
              },
            ]}
          >
            <h2>What is an RSA Key Generator?</h2>
            <p>
              RSA (Rivest-Shamir-Adleman) is a widely used asymmetric cryptographic algorithm that relies on a pair of keys: a public key for encryption and a private key for decryption. Our RSA key generator online allows you to create these essential pairs in common lengths like 2048-bit or 4096-bit. Asymmetric encryption is a cornerstone of digital signatures and secure communication protocols like SSH and HTTPS. The security of RSA is based on the mathematical difficulty of factoring large prime numbers, making it a robust choice for establishing secure connections.
            </p>
            <p>
              When you generate an RSA key pair, the two keys are mathematically linked. The public key can be shared with anyone and is used to encrypt data or verify a signature. The private key, however, must be kept secret and is used to decrypt data encrypted with the corresponding public key or to create digital signatures. This dual-key system solves the problem of secure key exchange, as you don't need to share a secret password with the other party to establish a secure line of communication. By using a browser-native tool like Cipherly, you eliminate the risk of a third party intercepting your private key during the generation process, as the entire computation happens on your local machine.
            </p>

            <h2>When should you use RSA Key Pairs?</h2>
            <p>
              RSA key pairs are vital when you need to receive encrypted data from someone else without sharing a secret password beforehand. You provide your public key to the sender, and they use it to encrypt a message that only your private key can unlock. This client-side RSA tool is also used for creating digital signatures to prove the authenticity of a document or software. For maximum security, always use at least a 2048-bit key length. At Cipherly, we prioritize your security by generating these keys entirely within your browser's environment, ensuring your private key never leaves your device.
            </p>
            <p>
              Common use cases for RSA include securing web traffic via SSL/TLS, where RSA is often used for the initial handshake and key exchange. It is also the standard for SSH (Secure Shell) authentication, allowing developers to log into remote servers without passwords by placing their public key on the server. Furthermore, RSA is used in secure email systems and for signing software packages to ensure they haven't been tampered with. In modern cryptography, RSA is often used in combination with symmetric algorithms like AES; RSA handles the secure exchange of a temporary AES key, which is then used for the high-speed encryption of the actual data. This "hybrid" approach combines the key-distribution benefits of RSA with the performance of AES.
            </p>
            <p>
              If you are working with encrypted payloads, pair RSA key generation with our <Link href="/tools/aes-encryption-decryption" className="font-semibold text-primary hover:underline">AES encrypt/decrypt tool</Link> or with the <Link href="/tools/jwt-decoder-validator" className="font-semibold text-primary hover:underline">JWT debugger</Link> for secure token workflows.
            </p>
          </ToolOverview>
        </div>
      </div>
    </>
  );
}
