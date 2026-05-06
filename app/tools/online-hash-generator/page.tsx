import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const HashToolWrapper = dynamic(() => import('@/components/tools/hash/HashToolWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Free Online Hash Generator - MD5, SHA-1, SHA-256 | Cipherly",
  description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes online. Browser-based tool with no data stored. Secure hashing for text and files.",
  keywords: ["online hash generator", "md5 generator online", "sha256 hash generator", "sha512 online"],
  openGraph: {
    title: "Free Online Hash Generator - MD5, SHA-1, SHA-256 | Cipherly",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes online. Browser-based tool with no data stored.",
    type: "website",
    url: "https://cipherlyapp.com/tools/online-hash-generator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Hash Generator - MD5, SHA-1, SHA-256 | Cipherly",
    description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes online. 100% browser-based.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/online-hash-generator" },
};

export default function HashPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Can I reverse a SHA-256 hash back to text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Cryptographic hashes are one-way functions designed to be irreversible. The only way to find the original text is through brute-force or rainbow table attacks."
      }
    }, {
      "@type": "Question",
      "name": "Is MD5 still secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MD5 is considered cryptographically broken and should not be used for security-sensitive tasks like password hashing, but it is still useful for non-critical file checksums."
      }
    }, {
      "@type": "Question",
      "name": "Are my files uploaded when I generate a hash?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Cipherly hashes your files locally in the browser. Large files never leave your computer, which is faster and significantly more private than server-side tools."
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">All-in-One Cryptographic Hash Generator</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Generate secure MD5, SHA-1, SHA-256, and SHA-512 hashes for text and files locally.
            </p>
          </div>

          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <HashToolWrapper />
          </div>

          <section className="mt-20 max-w-4xl mx-auto prose prose-emerald dark:prose-invert">
            <h2>What is a Cryptographic Hash Generator?</h2>
            <p>
              A cryptographic hash function is a mathematical algorithm that maps data of arbitrary size to a bit string of a fixed size, known as a hash or checksum. This all-in-one hash generator online supports multiple algorithms including MD5, SHA-1, SHA-256, and SHA-512. Hashing is a one-way process, meaning it is computationally infeasible to reverse the hash back to the original input. This makes it a perfect tool for verifying data integrity and ensuring that a file or message has not been altered during transmission.
            </p>
            
            <h2>When should you use a Hashing Tool?</h2>
            <p>
              Hashing is commonly used for checksum verification, digital signatures, and storing password representations (though specialized password hashes like Bcrypt are preferred for the latter). You can use this free online tool to generate a SHA-256 hash for a downloaded file to verify its authenticity against the developer's provided hash. It is also useful for creating unique identifiers for data blocks in a database. At Cipherly, we provide a no sign up required experience where all hashing is performed via the native Web Crypto API in your browser, guaranteeing that your input data never touches our infrastructure.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
