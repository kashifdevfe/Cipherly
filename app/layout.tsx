import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#00FF9C",
  width: "device-width",
  initialScale: 1,
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cipherlyapp.com"),
  title: "Cipherly | Professional Online Cryptography & Security Tools",
  description: "Free, browser-native cryptographic toolkit. Securely use AES-256, RSA, JWT, and Bcrypt online. 100% private, zero-knowledge security for developers and users.",
  keywords: [
    "free online encryption tools", "aes encryption online", "rsa key generator online", 
    "jwt debugger online", "bcrypt hash generator online", "sha256 hash generator", 
    "base64 encoder decoder", "secure hmac generator", "browser-based cryptography",
    "private encryption tools", "developer security toolkit", "zero knowledge crypto"
  ],
  authors: [{ name: "Cipherly Team" }],
  creator: "Cipherly",
  publisher: "Cipherly",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "apple-touch-icon-precomposed", url: "/apple-touch-icon.png" },
    ],
  },
  verification: {
    google: "G6H4q-VjE8_hY7b8e-P9uI6y5t4r3e2w1q0", // User can replace with actual tag
  },
  openGraph: {
    title: "Cipherly | Military-Grade Text Encryption Online",
    description: "Private, secure, and browser-native encryption tools. AES, RSA, JWT, and more.",
    url: "https://cipherlyapp.com",
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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://cipherlyapp.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <head suppressHydrationWarning>
        <meta name="google-adsense-account" content="ca-pub-9460915138481579" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9460915138481579"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.variable} ${inter.className} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G73VRWBBHL"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
