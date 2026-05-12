import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FileText, Eye, Link as LinkIcon, Sparkles } from 'lucide-react';

import ToolOverview from '@/components/ToolOverview';

const Base64HmacWrapper = dynamic(() => import('@/components/tools/encode/Base64HmacWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Fast Base64 Encoder & Decoder Online | Cipherly",
  description: "Encode and decode text or files to Base64 online instantly. Professional browser-based conversion with no data stored. Secure and fast.",
  keywords: ["base64 encoder online", "base64 decoder online", "convert text to base64", "base64 file encoder", "binary to text online"],
  openGraph: {
    title: "Fast Base64 Encoder & Decoder Online | Cipherly",
    description: "Encode and decode text or files to Base64 online instantly. Professional browser-based conversion.",
    type: "website",
    url: "https://cipherlyapp.com/tools/base64-encode-decode",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipherly | Online Base64 Encoder & Decoder",
    description: "Convert text and files to Base64 instantly in your browser. All processing is local and private.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/base64-encode-decode" },
};

export default function Base64Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cipherly Base64 Tool",
    "description": "Encode and decode text or files to Base64 locally in your browser.",
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
      "name": "Is Base64 a form of encryption?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, Base64 is an encoding scheme, not encryption. It can be easily decoded by anyone without a key and does not provide any confidentiality or privacy for your data. Its purpose is to represent binary data in a text-based format for transmission."
      }
    }, {
      "@type": "Question",
      "name": "Can I convert images to Base64 here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our tool supports file input, allowing you to convert images, PDFs, or any other file into a Base64 string directly in your browser. The conversion happens on your local machine, which is faster for large files than uploading them."
      }
    }, {
      "@type": "Question",
      "name": "Is there a limit to how much I can encode?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The limit depends on your browser's available memory. Most modern browsers can handle several megabytes of data for Base64 encoding without any issues. Since the processing is local, the speed depends on your device's CPU."
      }
    }]
  };

  return (
    <>
      <Script
        id="base64-faq-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="base64-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Fast Base64 Encoding & Decoding Online</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Convert text and files to Base64 instantly. Secure, browser-native processing.
            </p>
          </div>

          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <Base64HmacWrapper />
          </div>

          <ToolOverview
            heading="Why Base64 belongs in a local browser tool"
            tagline="Encode and decode text or files without uploading sensitive data to a server."
            cards={[
              {
                title: 'Client-side conversion',
                description: 'All Base64 transforms happen in your browser, so your data never leaves the session.',
                icon: FileText,
              },
              {
                title: 'Quick file support',
                description: 'Convert images and documents instantly without waiting for an upload.',
                icon: Eye,
              },
              {
                title: 'Safe transport prep',
                description: 'Base64 is ideal for embedding data in JSON, HTML, and email payloads.',
                icon: LinkIcon,
              },
              {
                title: 'Developer-friendly',
                description: 'Test and debug encoding workflows directly in the browser.',
                icon: Sparkles,
              },
            ]}
          >
            <h2>What is a Base64 Encoder?</h2>
            <p>
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. Our Base64 encoder and decoder online tool allows you to convert plain text or file data into a string of 64 printable characters. While not a form of encryption (as it is easily reversible), Base64 is essential for transmitting data over media that are designed to deal with textual data, such as embedding images in HTML or CSS or sending attachments in email. It ensures that the data remains intact during transport without modification.
            </p>

            <h2>When should you use Base64 Encoding?</h2>
            <p>
              Base64 encoding is frequently used by developers to handle data in JSON payloads, URLs, or data URIs. If you need to convert a small image into a string to use directly in your code, or if you need to decode a Base64-encoded string from an API response, this fast browser-based tool is the perfect solution. It is also helpful for basic data obfuscation during development. As with all our tools, Cipherly processes your data locally. Whether you are encoding or decoding, your information is processed entirely in your browser, ensuring no data transmitted to external servers.
            </p>
            <p>
              Base64 is often used alongside other tools like the <Link href="/tools/jwt-decoder-validator" className="font-semibold text-primary hover:underline">JWT decoder</Link> when working with token payloads or the <Link href="/tools/aes-encryption-decryption" className="font-semibold text-primary hover:underline">AES encryption tool</Link> when embedding encrypted data in text-based formats.
            </p>
          </ToolOverview>
        </div>
      </div>
    </>
  );
}
