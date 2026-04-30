import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import JwtTabs from '@/components/tools/jwt/JwtTabs';

export const metadata: Metadata = {
  title: "Free JWT Decoder, Generator & Validator Online | HS256, RS256, PS256",
  description: "Decode, generate, and validate JSON Web Tokens online. Inspect JWT header and payload claims, verify signatures for HS256 and RS256. 100% client-side — tokens never leave your browser.",
  keywords: [
    "jwt decoder", "jwt decoder online", "decode jwt token", "json web token decoder",
    "jwt generator", "jwt token generator online", "create jwt token online",
    "jwt validator", "verify jwt token online", "jwt signature validator",
    "jwt hs256 hs512", "rs256 jwt tool", "jwt expiry checker",
    "inspect jwt claims", "jwt payload decoder", "free jwt tool online",
    "json web token tool", "jwt decode without secret", "jwt debug online"
  ],
  openGraph: {
    title: "Free JWT Decoder, Generator & Validator Online",
    description: "The ultimate tool for JWT developers. Decode payloads, generate signed tokens, and validate signatures.",
    type: "website",
  },
  alternates: { canonical: "https://cipherly.app/tools/jwt-decoder" },
};

export default function JwtPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JWT Decoder & Debugger",
    "applicationCategory": "DeveloperApplication",
    "description": "Decode, generate, and validate JSON Web Tokens (JWT) online.",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": [
      "JWT Decoding with syntax highlighting",
      "Human-readable claim dates (exp, iat, nbf)",
      "JWT Generation with custom claims",
      "HS256, HS384, HS512, RS256 support",
      "Signature verification with secret/public key",
      "100% Client-side"
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
          JWT <span className="text-primary">Debugger & Generator</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Inspect, create, and verify JSON Web Tokens (JWT) using various algorithms. 
          The most complete developer tool for JWT debugging.
        </p>
      </div>

      <JwtTabs />

      <div className="max-w-4xl mx-auto space-y-12 pt-12">
        <section className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">What is a JSON Web Token (JWT)?</h2>
          <p className="text-muted-foreground leading-relaxed">
            JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for 
            securely transmitting information between parties as a JSON object. This information can be verified 
            and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) 
            or a public/private key pair using RSA or ECDSA.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-3xl bg-secondary/20 border border-border space-y-3">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 font-bold">1</div>
              <h3 className="font-bold">Header</h3>
              <p className="text-xs text-muted-foreground">Typically consists of two parts: the type of the token (JWT) and the signing algorithm being used (e.g. HS256).</p>
            </div>
            <div className="p-6 rounded-3xl bg-secondary/20 border border-border space-y-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 font-bold">2</div>
              <h3 className="font-bold">Payload</h3>
              <p className="text-xs text-muted-foreground">Contains the claims. Claims are statements about an entity (typically, the user) and additional data.</p>
            </div>
            <div className="p-6 rounded-3xl bg-secondary/20 border border-border space-y-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 font-bold">3</div>
              <h3 className="font-bold">Signature</h3>
              <p className="text-xs text-muted-foreground">Used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.</p>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 border border-primary/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-4">Security Warning</h3>
          <p className="text-sm text-muted-foreground">
            While JWTs are secure because they are signed, the payload is only <strong>encoded</strong>, not encrypted. 
            This means anyone who has the token can read your payload. Never store sensitive information like passwords 
            or private keys inside a JWT payload.
          </p>
        </section>
      </div>
    </div>
  );
}
