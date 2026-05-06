import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const RsaToolWrapper = dynamic(() => import('@/components/tools/rsa/RsaToolWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Free Online RSA Key Generator - 2048/4096 bit | Cipherly",
  description: "Generate secure RSA public and private key pairs online. Browser-based generation with no data transmitted. Download keys locally.",
  keywords: ["rsa key generator online", "generate rsa keys online", "rsa public private key pair", "free rsa tool"],
  openGraph: {
    title: "Free Online RSA Key Generator - 2048/4096 bit | Cipherly",
    description: "Generate secure RSA public and private key pairs online. Browser-based generation with no data transmitted.",
    type: "website",
    url: "https://cipherlyapp.com/tools/rsa-key-generator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online RSA Key Generator - 2048/4096 bit | Cipherly",
    description: "Generate secure RSA public and private key pairs online. 100% browser-based.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/rsa-key-generator" },
};

export default function RsaPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Should I use 2048-bit or 4096-bit RSA keys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2048-bit keys are currently the standard and offer great security for most use cases. 4096-bit keys provide even higher security but are slower to process. Both are supported by Cipherly."
      }
    }, {
      "@type": "Question",
      "name": "Where are my RSA keys generated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your keys are generated locally in your browser's memory. They are never sent to our servers, and we do not have a copy of your private key."
      }
    }, {
      "@type": "Question",
      "name": "Can I use these RSA keys for SSH?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can use the generated keys for SSH authentication, though you may need to format them into OpenSSH format depending on your specific client requirements."
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Generate Secure RSA Key Pairs Online</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Create high-entropy RSA keys (2048/4096-bit) safely in your browser.
            </p>
          </div>

          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <RsaToolWrapper />
          </div>

          <section className="mt-20 max-w-4xl mx-auto prose prose-emerald dark:prose-invert">
            <h2>What is an RSA Key Generator?</h2>
            <p>
              RSA (Rivest-Shamir-Adleman) is a widely used asymmetric cryptographic algorithm that relies on a pair of keys: a public key for encryption and a private key for decryption. Our RSA key generator online allows you to create these essential pairs in common lengths like 2048-bit or 4096-bit. Asymmetric encryption is a cornerstone of digital signatures and secure communication protocols like SSH and HTTPS. The security of RSA is based on the mathematical difficulty of factoring large prime numbers, making it a robust choice for establishing secure connections.
            </p>
            
            <h2>When should you use RSA Key Pairs?</h2>
            <p>
              RSA key pairs are vital when you need to receive encrypted data from someone else without sharing a secret password beforehand. You provide your public key to the sender, and they use it to encrypt a message that only your private key can unlock. This client-side RSA tool is also used for creating digital signatures to prove the authenticity of a document or software. For maximum security, always use at least a 2048-bit key length. At Cipherly, we prioritize your security by generating these keys entirely within your browser's environment, ensuring your private key never leaves your device.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
