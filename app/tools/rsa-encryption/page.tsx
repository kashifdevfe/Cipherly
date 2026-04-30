import { Metadata } from 'next';
import RsaToolWrapper from '@/components/tools/rsa/RsaToolWrapper';

export const metadata: Metadata = {
  title: "Free RSA Encryption & Decryption Online Tool | 2048 & 4096-bit",
  description: "Generate RSA key pairs and encrypt or decrypt data online using OAEP-SHA256 or PKCS1v15. Free, 100% client-side, no data ever leaves your browser.",
  keywords: [
    "rsa encryption online", "rsa decryption online", "rsa key generator online",
    "rsa encrypt decrypt", "rsa public private key generator", "online rsa tool free",
    "rsa 2048 encryption", "rsa 4096 key pair", "asymmetric encryption online",
    "rsa oaep sha256 online", "rsa pkcs1 online", "encrypt with public key online",
    "decrypt with private key online", "rsa encryption tool free",
    "client side rsa encryption"
  ],
  openGraph: {
    title: "Free RSA Encryption & Decryption Online Tool",
    description: "Generate RSA key pairs (512–4096-bit) and encrypt/decrypt online. 100% client-side — your data never leaves your browser.",
    type: "website",
  },
  alternates: { canonical: "https://cipherly.app/tools/rsa-encryption" },
};

export default function RsaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "RSA Encryption & Decryption Tool",
    "applicationCategory": "SecurityApplication",
    "description": "Free online RSA encryption and decryption tool with key pair generation.",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": [
      "RSA key pair generation (512–4096-bit)",
      "OAEP-SHA256 encryption (recommended)",
      "PKCS1v15 encryption (legacy)",
      "PEM format public and private keys",
      "Client-side only, no server processing"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          RSA <span className="text-primary">Encryption & Decryption</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Generate secure RSA key pairs and perform asymmetric encryption and decryption 
          directly in your browser.
        </p>
      </div>

      <RsaToolWrapper />

      <div className="max-w-4xl mx-auto space-y-8 pt-12">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-bold">What is RSA?</h2>
          <p className="text-muted-foreground">
            RSA (Rivest–Shamir–Adleman) is a public-key cryptosystem that is widely used for secure data transmission. 
            In such a cryptosystem, the encryption key is public and distinct from the decryption key, which is kept secret (private). 
            This asymmetry is based on the practical difficulty of factoring the product of two large prime numbers, the "factoring problem".
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border">
              <h4 className="font-bold mb-2">Asymmetric Encryption</h4>
              <p className="text-xs text-muted-foreground">
                Unlike AES which uses the same key for both encryption and decryption, RSA uses a pair of keys. 
                Data encrypted with the public key can only be decrypted with the matching private key.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border">
              <h4 className="font-bold mb-2">Digital Signatures</h4>
              <p className="text-xs text-muted-foreground">
                RSA is also used for digital signatures. By "encrypting" with a private key, the owner can prove 
                identity, as anyone with the public key can verify the signature but no one else can create it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
