import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#00FF9C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherly.app"),
  title: {
    default: "Free Online Text Encryption & Decryption Tool | AES-256",
    template: "%s | Cipherly Security",
  },
  description: "Securely encrypt and decrypt text online using AES-256, RSA, JWT, and Bcrypt. 100% client-side processing for maximum privacy. No data ever leaves your browser.",
  keywords: [
    "text encryption", "text decryption", "AES-256 online", "RSA generator", 
    "JWT debugger", "Bcrypt hash generator", "MD5 hash online", "Base64 encoder",
    "secure messaging", "client-side encryption", "privacy tools", "free crypto tools"
  ],
  authors: [{ name: "Cipherly Team" }],
  creator: "Cipherly",
  publisher: "Cipherly",
  manifest: "/manifest.json",
  openGraph: {
    title: "Cipherly | Military-Grade Text Encryption Online",
    description: "Private, secure, and browser-native encryption tools. AES, RSA, JWT, and more.",
    url: "https://cipherly.app",
    siteName: "Cipherly",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cipherly Security Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cipherly | Secure Text Encryption Toolkit",
    description: "Encrypt and decrypt text with AES-256 directly in your browser.",
    images: ["/og-image.png"],
    creator: "@cipherly",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://cipherly.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460915138481579"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${inter.variable} ${inter.className} antialiased min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G73VRWBBHL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G73VRWBBHL', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <ThemeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
