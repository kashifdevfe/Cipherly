import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Fingerprint, Search, FileCode } from 'lucide-react';
import HashToolWrapper from '@/components/tools/hash/HashToolWrapper';

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "MD5 Hash Generator & SHA-256 Tool — Secure Checksums | Cipherly",
  description: "Generate and verify MD5, SHA-1, SHA-256, and SHA-512 hashes instantly. Hash text or files locally in your browser. 100% private, no data is ever uploaded.",
  keywords: [
    "md5 hash generator", "sha-256 generator online", "sha-512 online",
    "md5 checksum verifier", "file hash checker", "md5 generator free",
    "generate sha256 hash", "online hash tool", "private checksum tool"
  ],
  openGraph: {
    title: "MD5 Hash Generator & SHA-256 Tool — Secure Checksums | Cipherly",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes for text or files. Verify checksums. 100% private.",
    type: "website",
    siteName: "Cipherly",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD5 Hash Generator & SHA-256 Tool | Cipherly",
    description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes for text or files. Verify checksums. 100% client-side.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/md5-hash-generator" },
};

export default function HashPage() {
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MD5 & SHA Hash Generator",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MD5 & SHA Hash Generator",
    "applicationCategory": "SecurityApplication",
    "description": "Generate and verify cryptographic hashes like MD5 and SHA-256 online.",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": [
      "MD5 Hash Generation",
      "SHA-256 and SHA-512 Generation",
      "Hash verification / checksum checking",
      "File hashing up to 100MB",
      "100% Client-side processing"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <script
        id="software-app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        id="web-app-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />

      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Hash <span className="text-primary">Generator & Verifier</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Create and verify MD5, SHA-1, SHA-256, and SHA-512 hashes for text strings or files. 
          Everything is processed locally in your browser.
        </p>
      </div>

      <HashToolWrapper />

      <div className="max-w-4xl mx-auto space-y-12 pt-12">
        <section className="prose prose-invert max-w-none grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What is MD5?</h2>
            <p className="text-sm text-muted-foreground">
              MD5 (Message-Digest algorithm 5) is a widely used cryptographic hash function that produces a 128-bit hash value. 
              While it was originally designed to be used as a cryptographic hash function, it has been found to suffer from 
              extensive vulnerabilities. It is still suitable for non-cryptographic purposes, such as determining the 
              partition for a particular key in a partitioned database.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What is SHA-256?</h2>
            <p className="text-sm text-muted-foreground">
              SHA-256 (Secure Hash Algorithm 256) is a member of the SHA-2 family. It is a cryptographic hash function 
              designed by the NSA. SHA-256 is one of the most secure hashing functions on the market and is used 
              extensively in blockchain technology (Bitcoin) and secure SSL certificates.
            </p>
          </div>
        </section>

        <section className="bg-secondary/20 border border-border rounded-3xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center">Hashing Best Practices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Use SHA-256 for Security", desc: "Never use MD5 or SHA-1 for sensitive data like passwords or digital signatures." },
              { title: "Check File Integrity", desc: "Always verify the hash of downloaded files to ensure they haven't been tampered with." },
              { title: "Salt Your Hashes", desc: "When hashing passwords, always add a unique 'salt' to protect against rainbow table attacks." },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <h4 className="font-bold text-sm text-primary">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
