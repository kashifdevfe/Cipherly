import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

export default function AuthorBio() {
  return (
    <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row gap-6 items-center md:items-start bg-secondary/10 p-8 rounded-[2rem]">
      <div className="w-20 h-20 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
        <ShieldCheck className="w-10 h-10 text-primary" />
      </div>
      <div className="space-y-2 text-center md:text-left">
        <h4 className="text-xl font-bold text-foreground">Cipherly Security Team</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The Cipherly Security Team consists of passionate web developers and cryptography enthusiasts dedicated to making privacy and security accessible to everyone. We believe in open standards, zero-knowledge architecture, and education.
        </p>
      </div>
    </div>
  );
}
