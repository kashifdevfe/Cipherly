import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const BcryptToolWrapper = dynamic(() => import('@/components/tools/bcrypt/BcryptToolWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Free Online Bcrypt Hash Generator and Verifier | Cipherly",
  description: "Generate and verify Bcrypt hashes online for password security. Browser-based hashing with no data transmitted. Secure your passwords.",
  keywords: ["bcrypt hash generator", "bcrypt online", "verify bcrypt hash", "bcrypt cost factor"],
  openGraph: {
    title: "Free Online Bcrypt Hash Generator and Verifier | Cipherly",
    description: "Generate and verify Bcrypt hashes online for password security. Browser-based hashing with no data transmitted.",
    type: "website",
    url: "https://cipherlyapp.com/tools/bcrypt-hash-generator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Bcrypt Hash Generator and Verifier | Cipherly",
    description: "Generate and verify Bcrypt hashes online. 100% browser-based.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/bcrypt-hash-generator" },
};

export default function BcryptPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What cost factor should I use for Bcrypt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A cost factor of 10 or 12 is currently recommended for most web applications. Higher numbers increase security but also increase the server time required for each login."
      }
    }, {
      "@type": "Question",
      "name": "Does this tool send my password to a server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely not. Your raw password stays in your browser. We only perform the hashing calculation locally using JavaScript, ensuring complete privacy."
      }
    }, {
      "@type": "Question",
      "name": "Can I verify a Bcrypt hash against a password?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our tool includes a verifier feature that allows you to check if a plain text password matches a previously generated Bcrypt hash string."
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Bcrypt Password Hashing Tool Online</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Securely generate and verify Bcrypt password hashes with custom cost factors.
            </p>
          </div>

          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <BcryptToolWrapper />
          </div>

          <section className="mt-20 max-w-4xl mx-auto prose prose-emerald dark:prose-invert">
            <h2>What is a Bcrypt Hash Generator?</h2>
            <p>
              Bcrypt is a password-hashing function based on the Blowfish cipher, specifically designed to be slow and computationally expensive to protect against brute-force and hardware-accelerated attacks. Our Bcrypt hash generator online allows you to create secure, salted password hashes with adjustable cost factors. Unlike standard algorithms like MD5, Bcrypt includes a random salt automatically, which prevents "rainbow table" attacks. It is the gold standard for secure password storage in modern databases and is trusted by millions of developers worldwide.
            </p>
            
            <h2>When should you use Bcrypt?</h2>
            <p>
              You should use Bcrypt whenever you are implementing a user authentication system and need to store passwords securely. It is also used by security auditors to verify that a system's hashing implementation is working as expected. When using this tool, we recommend a cost factor of at least 10 to balance security and performance. Because password security is the ultimate priority, Cipherly performs all Bcrypt operations client-side. This ensures your raw passwords never leave your browser, adhering to our zero-knowledge architecture and providing a completely private hashing experience.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
