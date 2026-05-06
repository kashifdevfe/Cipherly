import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Base64HmacWrapper = dynamic(() => import('@/components/tools/encode/Base64HmacWrapper'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Free Online Base64 Encoder and Decoder Tool | Cipherly",
  description: "Encode and decode text or files to Base64 online instantly. Browser-based processing with no data stored. Convert data securely.",
  keywords: ["base64 encoder online", "base64 decoder online", "convert text to base64", "base64 file encoder"],
  openGraph: {
    title: "Free Online Base64 Encoder and Decoder Tool | Cipherly",
    description: "Encode and decode text or files to Base64 online instantly. Browser-based processing with no data stored.",
    type: "website",
    url: "https://cipherlyapp.com/tools/base64-encode-decode",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Base64 Encoder and Decoder Tool | Cipherly",
    description: "Encode and decode text or files to Base64 online instantly. 100% browser-based.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/base64-encode-decode" },
};

export default function Base64Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Is Base64 a form of encryption?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, Base64 is an encoding scheme, not encryption. It can be easily decoded by anyone without a key and does not provide security or privacy for your data."
      }
    }, {
      "@type": "Question",
      "name": "Can I convert images to Base64 here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our tool supports file input, allowing you to convert images, PDFs, or any other file into a Base64 string directly in your browser."
      }
    }, {
      "@type": "Question",
      "name": "Is there a limit to how much I can encode?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The limit depends on your browser's available memory. Most modern browsers can handle several megabytes of data for Base64 encoding without any issues."
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Fast Base64 Encoding & Decoding Online</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Convert text and files to Base64 instantly. Secure, browser-native processing.
            </p>
          </div>

          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <Base64HmacWrapper />
          </div>

          <section className="mt-20 max-w-4xl mx-auto prose prose-emerald dark:prose-invert">
            <h2>What is a Base64 Encoder?</h2>
            <p>
              Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. Our Base64 encoder and decoder online tool allows you to convert plain text or file data into a string of 64 printable characters. While not a form of encryption (as it is easily reversible), Base64 is essential for transmitting data over media that are designed to deal with textual data, such as embedding images in HTML or CSS or sending attachments in email. It ensures that the data remains intact during transport without modification.
            </p>
            
            <h2>When should you use Base64 Encoding?</h2>
            <p>
              Base64 encoding is frequently used by developers to handle data in JSON payloads, URLs, or data URIs. If you need to convert a small image into a string to use directly in your code, or if you need to decode a Base64-encoded string from an API response, this fast browser-based tool is the perfect solution. It is also helpful for basic data obfuscation during development. As with all our tools, Cipherly processes your data locally. Whether you are encoding or decoding, your information is processed entirely in your browser, ensuring no data transmitted to external servers.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
