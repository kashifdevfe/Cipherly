import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-secondary/30 backdrop-blur-md mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-primary/20">
                <Image 
                  src="/logo.png" 
                  alt="Cipherly Logo" 
                  fill 
                  className="object-cover scale-110"
                />
              </div>
              <span className="text-2xl font-black tracking-tighter">Cipherly</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md font-medium">
              Professional-grade, browser-native cryptographic toolkit. 
              We leverage the Web Crypto API to ensure your sensitive data 
              never leaves your device. Secure, private, and always free.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-sm uppercase tracking-widest mb-6 text-primary">Security Tools</h3>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">AES Encryption</Link></li>
              <li><Link href="/tools/rsa-encryption" className="hover:text-primary transition-colors">RSA Key Gen</Link></li>
              <li><Link href="/tools/jwt-decoder" className="hover:text-primary transition-colors">JWT Debugger</Link></li>
              <li><Link href="/tools/md5-hash-generator" className="hover:text-primary transition-colors">Hash Generator</Link></li>
              <li><Link href="/tools/bcrypt-hash-generator" className="hover:text-primary transition-colors">Bcrypt Tool</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-sm uppercase tracking-widest mb-6 text-primary">Developer</h3>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">API Docs</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Web Crypto API</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Security Audit</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">GitHub</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
              <h4 className="font-bold text-sm">Privacy Commitment</h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                Cipherly is built on the principle of Zero Knowledge. 
                Your keys and plain text are never transmitted or stored.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                100% Client-Side
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-muted-foreground">
          <p>© {currentYear} Cipherly Security. All rights reserved.</p>
          <div className="flex gap-8 font-bold uppercase tracking-tighter text-[10px]">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
