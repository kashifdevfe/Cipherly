"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookie_consent");
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);
  };

  const handleDecline = () => {
    // We still hide the banner, but we might want to store "false" if we need to
    // strictly disable certain non-essential cookies. For AdSense, "true" is standard.
    localStorage.setItem("cookie_consent", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8 pointer-events-none flex justify-center">
      <div className="bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-6 max-w-4xl w-full pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-bold">We value your privacy</h3>
          <p className="text-sm text-muted-foreground">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link> to learn more.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={handleDecline}
            className="px-6 py-2.5 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-sm font-semibold"
          >
            Decline All
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-bold shadow-[0_0_20px_rgba(0,255,156,0.2)]"
          >
            Accept All
          </button>
          <button 
            onClick={handleDecline}
            className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground sm:hidden"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
