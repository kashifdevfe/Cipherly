import { Metadata } from 'next';
import { Gavel, Scale, AlertOctagon } from 'lucide-react';

export const metadata: Metadata = {
  title: "Terms of Service | Cipherly Security Toolkit",
  description: "Standard terms and conditions for using the Cipherly security suite.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="space-y-6 mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tighter uppercase">Terms of Service</h1>
        <p className="text-xl text-muted-foreground font-medium">
          Legal guidelines for using our cryptographic suite.
        </p>
      </div>

      <div className="glass rounded-[3rem] p-10 md:p-16 space-y-12 leading-relaxed">
        <div className="flex items-center gap-4 p-6 rounded-3xl bg-primary/5 border border-primary/20">
          <AlertOctagon className="w-8 h-8 text-primary shrink-0" />
          <p className="text-sm font-bold text-primary italic">
            Disclaimer: Cipherly provides security tools as-is. We do not store your keys. 
            If you lose your key, your encrypted data is irrecoverable.
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Scale className="w-6 h-6 text-primary" />
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground font-medium">
            By accessing and using Cipherly.app, you agree to be bound by these Terms of Service. 
            If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Gavel className="w-6 h-6 text-primary" />
            2. Permitted Use
          </h2>
          <p className="text-muted-foreground font-medium">
            You may use Cipherly for personal, educational, or professional purposes. 
            However, you agree not to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
            <li>Use the tools for any illegal or unauthorized activities.</li>
            <li>Attempt to reverse engineer the application's internal security logic.</li>
            <li>Use the service to automate the generation of malicious payloads.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">3. No Warranty</h2>
          <p className="text-muted-foreground font-medium">
            The software is provided "as is", without warranty of any kind, express or implied, 
            including but not limited to the warranties of merchantability, fitness for a 
            particular purpose and non-infringement. In no event shall the authors or 
            copyright holders be liable for any claim, damages or other liability.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">4. Responsibility for Data</h2>
          <p className="text-muted-foreground font-medium">
            Cipherly does not store keys, passwords, or data. You are solely responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
            <li>The security and backup of your encryption keys.</li>
            <li>The strength of the passwords you use for hashing.</li>
            <li>The consequences of data loss resulting from forgotten keys.</li>
          </ul>
        </section>

        <section className="pt-8 border-t border-border text-xs text-muted-foreground font-bold uppercase tracking-widest">
          <span>Effective Date: April 30, 2026</span>
        </section>
      </div>
    </div>
  );
}
