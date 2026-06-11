import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Eye, ShieldCheck, Key, Sparkles } from 'lucide-react';
import AdUnit from '@/components/AdUnit';
import ToolOverview from '@/components/ToolOverview';

const JwtTabs = dynamic(() => import('@/components/tools/jwt/JwtTabs'));

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Professional JWT Decoder & Validator Online | Cipherly",
  description: "Decode and validate JSON Web Tokens (JWT) online instantly. Inspect headers and payloads locally. 100% browser-based with no data stored.",
  keywords: ["jwt decoder online", "jwt validator online", "decode jwt online", "jwt debugger free", "json web token debugger"],
  openGraph: {
    title: "Professional JWT Decoder & Validator Online | Cipherly",
    description: "Decode and validate JSON Web Tokens (JWT) online. No data stored. Inspect headers and payloads locally.",
    type: "website",
    url: "https://cipherlyapp.com/tools/jwt-decoder-validator",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipherly | Private JWT Decoder & Debugger",
    description: "Inspect and validate JWT tokens securely in your browser. Authentication tokens never leave your device.",
    images: "/og-image.png",
  },
  alternates: { canonical: "https://cipherlyapp.com/tools/jwt-decoder-validator" },
};

export default function JwtPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cipherly JWT Decoder",
    "description": "Decode and validate JSON Web Tokens locally in your browser.",
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
      "name": "Is it safe to decode a JWT online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most online decoders send your token to their server, which is a major security risk as these tokens often contain sensitive session data. Cipherly's JWT decoder is 100% browser-based, meaning your authentication token never leaves your device and is processed entirely in local memory."
      }
    }, {
      "@type": "Question",
      "name": "Can Cipherly verify JWT signatures?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our tool can verify signatures for standard algorithms like HS256 and RS256. If you provide the secret key or public certificate, the verification is performed locally using standard cryptographic libraries, ensuring the integrity of the token."
      }
    }, {
      "@type": "Question",
      "name": "Does this tool store my JWT tokens?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. We do not store any token data. Our application follows a zero-knowledge architecture. Once you close the browser tab or refresh the page, all decoded information is cleared from your browser's temporary memory."
      }
    }]
  };

  return (
    <>
      <Script
        id="jwt-faq-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="jwt-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

          <AdUnit slot="3456789012" format="horizontal" />

          <ToolOverview
            heading="Why JWT debugging belongs in-browser"
            tagline="Inspect and validate tokens locally so sensitive claims and secrets are never exposed."
            cards={[
              {
                title: 'Token visibility',
                description: 'Decode JWT headers and payloads instantly without sending tokens to a server.',
                icon: Eye,
              },
              {
                title: 'Signature validation',
                description: 'Verify JWT signatures locally for safe authentication debugging.',
                icon: ShieldCheck,
              },
              {
                title: 'Claim inspection',
                description: 'See expiration, audience, and custom claims clearly to troubleshoot auth issues.',
                icon: Key,
              },
              {
                title: 'Private token flow',
                description: 'Your JWT remains in browser memory, protecting session and identity data.',
                icon: Sparkles,
              },
            ]}
          >
            <h2>What is a JWT Decoder?</h2>
            <p>
              A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. A JWT decoder online allows developers to inspect the header, payload, and signature of a token to verify its contents and expiration. Tokens are typically used for authentication and information exchange in modern web applications. Understanding the claims inside a token is essential for debugging authorization issues and ensuring that your API integration is functioning correctly.
            </p>

            <h2>Anatomy of a JSON Web Token</h2>
            <p>
              If you look at a raw JWT, it appears as a long string of seemingly random characters separated by two dots (periods). These dots divide the token into three distinct parts:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
              <li><strong>Header:</strong> The first part of the token typically consists of two parts: the type of the token (which is JWT) and the signing algorithm being used, such as HMAC SHA256 or RSA.</li>
              <li><strong>Payload (Claims):</strong> The middle section contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims. Registered claims are predefined and include standard fields like `iss` (issuer), `exp` (expiration time), and `sub` (subject).</li>
              <li><strong>Signature:</strong> The final part is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way. To create the signature, the algorithm takes the encoded header, the encoded payload, a secret (or a public/private key pair), and signs them.</li>
            </ul>

            <h2>When should you use a JWT Debugger?</h2>
            <p>
              Developers use a JWT debugger tool during the development and testing of applications that use OAuth2 or OIDC for authentication. If your application is rejecting a token or if you need to verify that a token contains the correct user permissions, this browser-based tool provides an instant view of the encoded data. Unlike other debuggers that send your sensitive tokens to a backend for decoding, Cipherly processes the JWT entirely in your local memory. This ensures that no data is stored on our servers, keeping your authentication tokens private and secure throughout your debugging session.
            </p>

            <h2>Security Best Practices for JWTs</h2>
            <p>
              While JWTs are incredibly useful, they must be implemented correctly to be secure. Here are some essential best practices to follow when using JWTs in your applications:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 mb-6">
              <li><strong>Do Not Store Sensitive Data in the Payload:</strong> A common misconception is that JWTs are encrypted. They are not; they are only base64 encoded. Anyone with access to the token can decode the payload and read the claims. Never put passwords, social security numbers, or sensitive PII in a JWT.</li>
              <li><strong>Always Verify the Signature:</strong> Decoding a token is not the same as validating it. Always ensure your backend server cryptographically verifies the signature before trusting any data within the token.</li>
              <li><strong>Use Strong Signing Keys:</strong> If you are using symmetric algorithms (like HS256), ensure your secret key is long, complex, and unguessable. If using asymmetric algorithms (like RS256), protect your private key securely.</li>
              <li><strong>Keep Tokens Short-Lived:</strong> Since JWTs are stateless, they cannot easily be invalidated (revoked) before they expire without maintaining a server-side blocklist. Set the `exp` (expiration) claim to a short duration (e.g., 15 minutes) to minimize the window of opportunity if a token is compromised.</li>
              <li><strong>Understand the 'alg: none' Vulnerability:</strong> Historically, some JWT libraries improperly handled the 'none' algorithm, allowing attackers to bypass signature validation. Ensure your backend library explicitly requires the expected algorithm and rejects 'none'.</li>
            </ul>

            <p>
              JWTs are often signed or encrypted within secure API workflows. For example, use our <Link href="/tools/hmac-signature-generator" className="font-semibold text-primary hover:underline">HMAC generator</Link> to verify token signatures or the <Link href="/tools/rsa-key-generator" className="font-semibold text-primary hover:underline">RSA key generator</Link> for RS256 signature verification and key exchange.
            </p>
          </ToolOverview>
        </div>
      </div>
    </>
  );
}
