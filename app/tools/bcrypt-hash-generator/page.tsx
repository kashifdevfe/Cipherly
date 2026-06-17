import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ShieldCheck, Key, Cpu, Sparkles } from 'lucide-react';

import ToolOverview from '@/components/ToolOverview';

const BcryptToolWrapper = dynamic(() => import('@/components/tools/bcrypt/BcryptToolWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Bcrypt Hash Generator & Verifier Online | Cipherly",
  description: "Generate and verify Bcrypt hashes online for password security. Secure browser-based hashing with custom cost factors. 100% private.",
  keywords: ["bcrypt hash generator", "bcrypt online", "verify bcrypt hash", "bcrypt cost factor", "password hashing tool"],
  openGraph: {
    title: "Bcrypt Hash Generator & Verifier Online | Cipherly",
    description: "Generate and verify Bcrypt hashes online for password security. Secure browser-based hashing with custom cost factors.",
    type: "website",
    url: "https://cipherlyapp.com/tools/bcrypt-hash-generator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipherly | Private Bcrypt Hash Generator",
    description: "Generate secure Bcrypt password hashes directly in your browser. Raw passwords never leave your computer.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/bcrypt-hash-generator" },
};

export default function BcryptPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cipherly Bcrypt Tool",
    "description": "Generate and verify Bcrypt password hashes locally in your browser.",
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
      "name": "What cost factor should I use for Bcrypt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cost factor of 10 or 12 is currently recommended for most modern web applications. This value determines the number of iterations; higher numbers exponentially increase security against brute-force attacks but also increase the computation time for each login. Cipherly allows you to test different cost factors locally."
      }
    }, {
      "@type": "Question",
      "name": "Does this tool send my password to a server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely not. Your raw password stays entirely within your browser. We perform all hashing calculations locally using JavaScript, ensuring your sensitive data never touches our infrastructure. This is the core of our zero-knowledge security commitment."
      }
    }, {
      "@type": "Question",
      "name": "Can I verify an existing Bcrypt hash?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our tool includes a built-in verifier. You can paste a previously generated Bcrypt hash string and a plain text password to check if they match. This is a common task for developers testing their own database implementations."
      }
    }]
  };

  return (
    <>
      <Script
        id="bcrypt-faq-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="bcrypt-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Bcrypt Password Hashing Tool Online</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Securely generate and verify Bcrypt password hashes with custom cost factors.
            </p>
          </div>

          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <BcryptToolWrapper />
          </div>

          <ToolOverview
            heading="Why Bcrypt hashing should stay client-side"
            tagline="Generate and verify Bcrypt hashes locally to keep passwords and salt values private."
            cards={[
              {
                title: 'Adaptive password hashing',
                description: 'Bcrypt intentionally slows hashing to resist brute-force attacks.',
                icon: ShieldCheck,
              },
              {
                title: 'Custom cost factors',
                description: 'Experiment with different work factors locally before applying them to production.',
                icon: Key,
              },
              {
                title: 'Zero-knowledge hashing',
                description: 'Your raw password stays in the browser; only the resulting hash is generated.',
                icon: Cpu,
              },
              {
                title: 'Built-in verification',
                description: 'Verify hashes privately without exposing passwords to any service.',
                icon: Sparkles,
              },
            ]}
          >
            <h2>What is a Bcrypt Hash Generator?</h2>
            <p>
              Bcrypt is a password-hashing function based on the Blowfish cipher, specifically designed to be slow and computationally expensive to protect against brute-force and hardware-accelerated attacks. Our Bcrypt hash generator online allows you to create secure, salted password hashes with adjustable cost factors. Unlike standard algorithms like MD5, Bcrypt includes a random salt automatically, which prevents "rainbow table" attacks. It is the gold standard for secure password storage in modern databases and is trusted by millions of developers worldwide.
            </p>

            <h2>How Bcrypt Works: Salting and Cost Factors</h2>
            <p>
              The brilliance of Bcrypt lies in two key features: automatic salting and adjustable cost factors. A "salt" is a random sequence of characters added to a password before it is hashed. If two users have the same password, the salt ensures their resulting hashes look completely different. This protects against rainbow table attacks where hackers pre-compute hashes for common passwords. Bcrypt automatically generates a secure, 128-bit salt every time you generate a hash.
            </p>
            <p>
              The "cost factor" (or work factor) is what makes Bcrypt unique. It determines how many iterations of the hashing algorithm are performed. Each time you increase the cost factor by 1, the time required to calculate the hash doubles. This "slowness" is intentional. While a single hash might take 100 milliseconds for legitimate login—a delay unnoticed by a human—it makes it computationally infeasible for an attacker to rapidly guess millions of passwords per second using custom hardware or GPUs. As computers get faster over the years, you simply increase the cost factor to maintain the same level of security.
            </p>

            <h2>Why Bcrypt is Better Than MD5 or SHA-256 for Passwords</h2>
            <p>
              A common mistake among junior developers is storing passwords using fast hashing algorithms like MD5, SHA-1, or SHA-256. These algorithms were designed for speed and efficiency, which is exactly the opposite of what you want for password hashing. A modern GPU can compute billions of SHA-256 hashes per second, making it relatively easy to crack simple passwords. Bcrypt, by design, resists hardware acceleration because it requires a large amount of memory to compute, frustrating attackers utilizing GPUs and ASICs. If you are currently using SHA-256 to hash user passwords, you should strongly consider migrating to Bcrypt.
            </p>

            <h2>When should you use Bcrypt?</h2>
            <p>
              You should use Bcrypt whenever you are implementing a user authentication system and need to store passwords securely. It is also used by security auditors to verify that a system's hashing implementation is working as expected. When using this tool, we recommend a cost factor of at least 10 to balance security and performance. Because password security is the ultimate priority, Cipherly performs all Bcrypt operations client-side. This ensures your raw passwords never leave your browser, adhering to our zero-knowledge architecture and providing a completely private hashing experience.
            </p>
            <p>
              If you need a one-way checksum without adaptive hashing, try our <Link href="/tools/online-hash-generator" className="font-semibold text-primary hover:underline">hash generator</Link>. For secure data workflows, Bcrypt is best used for password storage while AES and RSA tools handle encryption of actual messages.
            </p>

            <h2>Code Example: Hashing Passwords in Node.js</h2>
            <p>If you are building a Node.js backend, use the widely trusted <code>bcrypt</code> library. Here is a standard implementation for hashing and verifying passwords:</p>
            <div className="bg-secondary/30 rounded-xl p-4 overflow-x-auto text-sm font-mono border border-border">
              <pre>
                <code>{`const bcrypt = require('bcrypt');

// 1. Hash a new password before saving to the database
async function hashPassword(plainTextPassword) {
  const saltRounds = 12; // Recommended cost factor
  try {
    const hash = await bcrypt.hash(plainTextPassword, saltRounds);
    console.log("Save this hash to DB:", hash);
    return hash;
  } catch (err) {
    console.error("Error hashing password", err);
  }
}

// 2. Verify a password during user login
async function verifyPassword(plainTextPassword, hashFromDatabase) {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashFromDatabase);
    if (match) {
      console.log("Login successful!");
      return true;
    } else {
      console.log("Invalid credentials.");
      return false;
    }
  } catch (err) {
    console.error("Error verifying password", err);
  }
}`}</code>
              </pre>
            </div>
          </ToolOverview>
        </div>
      </div>
    </>
  );
}
