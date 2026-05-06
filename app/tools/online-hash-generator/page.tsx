import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const HashToolWrapper = dynamic(() => import('@/components/tools/hash/HashToolWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Online Hash Generator - MD5, SHA-1, SHA-256 | Cipherly",
  description: "Generate secure MD5, SHA-1, SHA-256, and SHA-512 hashes online. Professional browser-based hashing for text and files. 100% private and secure.",
  keywords: ["online hash generator", "md5 generator online", "sha256 hash generator", "sha512 online", "file checksum online"],
  openGraph: {
    title: "Online Hash Generator - MD5, SHA-1, SHA-256 | Cipherly",
    description: "Generate secure MD5, SHA-1, SHA-256, and SHA-512 hashes online. Browser-based tool with no data stored.",
    type: "website",
    url: "https://cipherlyapp.com/tools/online-hash-generator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipherly | Online MD5 & SHA-256 Hash Generator",
    description: "Generate secure cryptographic hashes for text and files directly in your browser. No data ever leaves your computer.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/online-hash-generator" },
};

export default function HashPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cipherly Hash Generator",
    "description": "Generate cryptographic hashes like MD5 and SHA-256 locally in your browser.",
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
      "name": "Can I reverse a SHA-256 hash back to text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Cryptographic hashes are one-way functions designed to be irreversible. They are not encryption; they are mathematical 'fingerprints' of the input data. The only way to find the original text is through brute-force or rainbow table attacks, which is why algorithms like SHA-256 are used for security."
      }
    }, {
      "@type": "Question",
      "name": "Is MD5 still secure for password storage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MD5 is considered cryptographically broken and is highly vulnerable to collision attacks. It should never be used for password hashing or security-sensitive tasks. For password storage, use adaptive hashing algorithms like Bcrypt (also available on Cipherly). MD5 remains useful only for non-critical file integrity checks."
      }
    }, {
      "@type": "Question",
      "name": "Are my files uploaded when I generate a hash?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Cipherly leverages the browser's native File API and Web Crypto API to process your files locally. Your data is read into memory on your own device and hashed without ever being transmitted to our servers. This is faster and significantly more private than server-side hashing tools."
      }
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <p>
              Unlike encryption, which is designed to be reversible with a key, hashing is intended to be a permanent transformation. A single character change in the input data will result in a completely different hash output (this is known as the avalanche effect). This property makes hashing indispensable in modern computing. For example, when you download a large software file, the developer often provides a SHA-256 hash. By hashing the file on your local machine and comparing it to the developer's hash, you can be 100% certain that the file you received is identical to the original and has not been corrupted or maliciously modified.
            </p>
            
            <h2>When should you use a Hashing Tool?</h2>
            <p>
              Hashing is commonly used for checksum verification, digital signatures, and storing password representations (though specialized password hashes like Bcrypt are preferred for the latter). You can use this free online tool to generate a SHA-256 hash for a downloaded file to verify its authenticity against the developer's provided hash. It is also useful for creating unique identifiers for data blocks in a database. At Cipherly, we provide a no sign up required experience where all hashing is performed via the native Web Crypto API in your browser, guaranteeing that your input data never touches our infrastructure.
            </p>
            <p>
              Another critical use case for hashing is in blockchain technology and git version control, where hashes are used to link blocks of data together. Security professionals also use hashes to index and identify malware samples without having to share the actual malicious code. When choosing an algorithm, SHA-256 is currently the recommended standard for most security applications due to its high resistance to collision attacks. Older algorithms like MD5 and SHA-1 are still used for legacy support and non-security checksums, but should be avoided for protecting sensitive information. Cipherly provides a fast, multi-algorithm interface that handles even large files efficiently by streaming them directly into the hashing engine within your browser.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
