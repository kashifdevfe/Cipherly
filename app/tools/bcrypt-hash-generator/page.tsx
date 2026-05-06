import { Metadata } from 'next';
import BcryptToolWrapper from '@/components/tools/bcrypt/BcryptToolWrapper';
import { Table } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Bcrypt Hash Generator & Verifier Online — Secure Password Hashing | Cipherly",
  description: "Securely generate and verify Bcrypt password hashes online. Custom cost factors (4–14). 100% private, browser-native hashing. Your passwords never touch our servers.",
  keywords: [
    "bcrypt hash generator", "bcrypt password hashing online", "bcrypt verifier",
    "bcrypt online tool", "password security tools", "bcrypt cost factor",
    "generate bcrypt hash online", "verify bcrypt hash", "secure password storage",
    "bcrypt tool free", "client-side password hashing"
  ],
  openGraph: {
    title: "Bcrypt Hash Generator & Verifier Online — Secure Password Hashing | Cipherly",
    description: "Secure Bcrypt password hashing tool. Adjust cost factors and verify existing hashes 100% locally.",
    type: "website",
    siteName: "Cipherly",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bcrypt Hash Generator & Verifier Online | Cipherly",
    description: "Secure password hashing with custom cost factors. Verify hashes instantly. 100% local, no server storage.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/bcrypt-hash-generator" },
};

export default function BcryptPage() {
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bcrypt Hash Tool",
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
    "name": "Bcrypt Hash Tool",
    "applicationCategory": "SecurityApplication",
    "description": "Generate and verify bcrypt password hashes online.",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": [
      "Bcrypt Hash Generation",
      "Configurable Cost Factor (4-14)",
      "Bcrypt Hash Verification",
      "Algorithm comparison table",
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
          Bcrypt <span className="text-primary">Hash Tool</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Securely hash passwords using the bcrypt algorithm or verify existing hashes. 
          Control salt rounds and see real-time latency estimations.
        </p>
      </div>

      <BcryptToolWrapper />

      <div className="max-w-5xl mx-auto space-y-12 pt-12">
        <section className="prose max-w-none grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Bcrypt Works</h2>
            <p className="text-sm text-muted-foreground">
              Bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher. 
              It incorporates a salt to protect against rainbow table attacks and is an adaptive function: 
              over time, the iteration count (cost factor) can be increased to make it slower, so it remains 
              resistant to brute-force search attacks even with increasing computing power.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why use Bcrypt?</h2>
            <p className="text-sm text-muted-foreground">
              Bcrypt is the industry standard for password storage because it is intentionally slow. 
              While SHA-256 can be computed millions of times per second on a GPU, Bcrypt is resistant 
              to GPU acceleration, making it much harder for attackers to crack stolen password databases.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
