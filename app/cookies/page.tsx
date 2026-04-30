import { Metadata } from 'next';
import { Cookie, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: "Cookie Policy | Cipherly Security Toolkit",
  description: "Learn how Cipherly uses cookies to provide a better user experience while maintaining privacy.",
};

export default function CookiePage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="space-y-6 mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tighter uppercase">Cookie Policy</h1>
        <p className="text-xl text-muted-foreground font-medium italic">
          Transparent information about our minimal cookie usage.
        </p>
      </div>

      <div className="glass rounded-[3rem] p-10 md:p-16 space-y-12 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Cookie className="w-6 h-6 text-primary" />
            1. What are cookies?
          </h2>
          <p className="text-muted-foreground font-medium">
            Cookies are small text files stored in your browser. Most websites use them to 
            remember preferences or track visits. At Cipherly, we keep cookie usage to an 
            absolute minimum.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary" />
            2. How We Use Cookies
          </h2>
          <p className="text-muted-foreground font-medium">
            We use cookies for the following specific purposes:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <div className="p-6 rounded-3xl bg-secondary/30 border border-border space-y-2">
              <h4 className="font-bold text-foreground">Preferences</h4>
              <p className="text-xs text-muted-foreground">To remember your theme choice (Light/Dark mode) across sessions.</p>
            </div>
            <div className="p-6 rounded-3xl bg-secondary/30 border border-border space-y-2">
              <h4 className="font-bold text-foreground">Analytics</h4>
              <p className="text-xs text-muted-foreground">Google Analytics uses cookies to help us understand how users find and use the site.</p>
            </div>
            <div className="p-6 rounded-3xl bg-secondary/30 border border-border space-y-2 md:col-span-2">
              <h4 className="font-bold text-foreground">Advertising</h4>
              <p className="text-xs text-muted-foreground">Google AdSense may use cookies to serve personalized ads based on your web activity.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">3. Managing Cookies</h2>
          <p className="text-muted-foreground font-medium text-sm leading-relaxed">
            You can choose to disable cookies in your browser settings. However, please note 
            that disabling all cookies may cause some features (like theme persistence) 
            to stop functioning correctly. You can also opt-out of personalized advertising 
            by visiting the Google Ad Settings page.
          </p>
        </section>

        <section className="pt-8 border-t border-border text-xs text-muted-foreground font-bold uppercase tracking-widest">
          <span>Effective Date: April 30, 2026</span>
        </section>
      </div>
    </div>
  );
}
