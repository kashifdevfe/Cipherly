import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, ShieldCheck, FileText, Zap } from 'lucide-react';
import Base64HmacWrapper from '@/components/tools/encode/Base64HmacWrapper';

export const metadata: Metadata = {
  title: "Free Base64 Encode & Decode Online + HMAC SHA-256 Generator",
  description: "Base64 encode or decode any text or file online instantly. Generate and verify HMAC-SHA256, SHA-384, SHA-512 signatures for API authentication. 100% client-side.",
  keywords: [
    "base64 encode", "base64 decode", "base64 encoder", "base64 decoder online",
    "base64 encode decode online", "base64 string encoder", "online base64 encoder",
    "text to base64", "base64 to text", "base64 file converter",
    "hmac sha256 online", "hmac generator", "hmac sha256 generator",
    "generate hmac signature", "verify hmac online", "hmac-sha256 free tool",
    "api authentication hmac", "message authentication code online",
    "hmac sha512 generator", "url safe base64 encoder"
  ],
  openGraph: {
    title: "Free Base64 Encode & Decode Online + HMAC SHA-256 Generator",
    description: "Convert text/files to Base64 and generate HMAC signatures for API security.",
    type: "website",
  },
  alternates: { canonical: "https://cipherly.app/tools/base64-encode-decode" },
};

export default function Base64Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Base64 & HMAC Tool",
    "applicationCategory": "DeveloperApplication",
    "description": "Base64 encoding/decoding and HMAC signature generation online.",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": [
      "Base64 Encoding & Decoding",
      "URL-safe Base64 support",
      "File to Base64 conversion",
      "HMAC-SHA256/384/512 Generation",
      "HMAC verification",
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
          Base64 <span className="text-primary">& HMAC Tools</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Quickly encode/decode Base64 data or generate and verify HMAC signatures 
          for secure API communication.
        </p>
      </div>

      <Base64HmacWrapper />

      <div className="max-w-4xl mx-auto space-y-12 pt-12">
        <section className="prose prose-invert max-w-none grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What is Base64?</h2>
            <p className="text-sm text-muted-foreground">
              Base64 is a group of binary-to-text encoding schemes that represent binary data in an ASCII string 
              format by translating it into a radix-64 representation. It is commonly used when there is a 
              need to encode binary data that needs to be stored and transferred over media that are 
              designed to deal with textual data.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What is HMAC?</h2>
            <p className="text-sm text-muted-foreground">
              HMAC (Keyed-hash message authentication code) is a specific type of message authentication code (MAC) 
              involving a cryptographic hash function and a secret cryptographic key. It may be used to 
              simultaneously verify both the data integrity and the authenticity of a message. 
              Commonly used in API authentication (e.g. AWS, Stripe).
            </p>
          </div>
        </section>

        <div className="p-8 rounded-3xl bg-secondary/20 border border-border">
          <h3 className="text-xl font-bold mb-6 text-center">Typical HMAC Use Case</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><Zap className="w-6 h-6" /></div>
              <p className="text-xs font-bold">1. CLIENT SENDS MESSAGE + HMAC</p>
            </div>
            <div className="text-muted-foreground hidden md:block">→</div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground"><ShieldCheck className="w-6 h-6" /></div>
              <p className="text-xs font-bold">2. SERVER VERIFIES WITH SECRET</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
