import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const JwtTabs = dynamic(() => import('@/components/tools/jwt/JwtTabs'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Free Online JWT Decoder and Validator Tool | Cipherly",
  description: "Decode and validate JSON Web Tokens (JWT) online. No data stored. Inspect headers, payloads, and verify signatures in your browser.",
  keywords: ["jwt decoder online", "jwt validator online", "decode jwt online", "jwt debugger free"],
  openGraph: {
    title: "Free Online JWT Decoder and Validator Tool | Cipherly",
    description: "Decode and validate JSON Web Tokens (JWT) online. No data stored.",
    type: "website",
    url: "https://cipherlyapp.com/tools/jwt-decoder-validator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online JWT Decoder and Validator Tool | Cipherly",
    description: "Decode and validate JSON Web Tokens (JWT) online. 100% browser-based.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/jwt-decoder-validator" },
};

export default function JwtPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "Is it safe to decode a JWT online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most online decoders send your token to their server, which is a security risk. Cipherly's JWT decoder is 100% browser-based, meaning your authentication token never leaves your device."
      }
    }, {
      "@type": "Question",
      "name": "Can Cipherly verify JWT signatures?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our tool can verify signatures for algorithms like HS256 and RS256 if you provide the secret key or public certificate, all processed locally."
      }
    }, {
      "@type": "Question",
      "name": "Does this tool store my JWT tokens?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. We do not store any token data. Once you close the tab, all decoded information is cleared from your browser's temporary memory."
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Professional JWT Debugger & Decoder Online</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Inspect and validate JSON Web Tokens instantly. No data ever leaves your device.
            </p>
          </div>

          <div className="glass rounded-[2.5rem] p-6 md:p-10">
            <JwtTabs />
          </div>

          <section className="mt-20 max-w-4xl mx-auto prose prose-emerald dark:prose-invert">
            <h2>What is a JWT Decoder?</h2>
            <p>
              A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. A JWT decoder online allows developers to inspect the header, payload, and signature of a token to verify its contents and expiration. Tokens are typically used for authentication and information exchange in modern web applications. Understanding the claims inside a token is essential for debugging authorization issues and ensuring that your API integration is functioning correctly.
            </p>
            
            <h2>When should you use a JWT Debugger?</h2>
            <p>
              Developers use a JWT debugger tool during the development and testing of applications that use OAuth2 or OIDC for authentication. If your application is rejecting a token or if you need to verify that a token contains the correct user permissions, this browser-based tool provides an instant view of the encoded data. Unlike other debuggers that send your sensitive tokens to a backend for decoding, Cipherly processes the JWT entirely in your local memory. This ensures that no data stored on our servers, keeping your authentication tokens private and secure throughout your debugging session.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
