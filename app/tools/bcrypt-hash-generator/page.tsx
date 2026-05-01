import { Metadata } from 'next';
import BcryptToolWrapper from '@/components/tools/bcrypt/BcryptToolWrapper';
import { Table } from 'lucide-react';

export const metadata: Metadata = {
  title: "Free Bcrypt Hash Generator & Password Verifier Online",
  description: "Generate and verify bcrypt password hashes online with configurable cost factor (4–14). 100% client-side. Compare bcrypt vs Argon2 vs PBKDF2 for secure password storage.",
  keywords: [
    "bcrypt hash generator", "bcrypt online", "bcrypt generator",
    "bcrypt hash verifier", "bcrypt password hash", "verify bcrypt hash online",
    "bcrypt cost factor", "bcrypt rounds calculator", "password hash generator",
    "bcrypt vs argon2", "secure password hashing online", "bcrypt checker online",
    "hash password online free", "bcrypt $2b format", "password hashing tool",
    "bcrypt salt rounds", "online bcrypt tool", "bcrypt hash checker"
  ],
  openGraph: {
    title: "Free Bcrypt Hash Generator & Password Verifier Online",
    description: "Secure bcrypt password hashing tool. Adjust cost factors and verify existing hashes 100% locally.",
    type: "website",
  },
  alternates: { canonical: "https://cipherly.app/tools/bcrypt-hash-generator" },
};

export default function BcryptPage() {
  const jsonLd = {
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
