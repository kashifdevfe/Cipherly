'use client';

import { ShieldCheck, Lock, Zap } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  return (
    <div className="relative text-center space-y-8 mb-20 pt-10">
      {/* Decorative blurred blobs - Mint themed */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/15 blur-[120px] rounded-full -z-10" />

      {/* Hero Logo */}
      <div className="flex justify-center mb-2">
        <div className="relative group">
          <Logo size={100} className="relative transition-transform group-hover:scale-105" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
        <ShieldCheck className="w-4 h-4" />
        Zero-Knowledge Architecture
      </div>

      <div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
          Free Online <br />
          <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-400 to-teal-500 animate-pulse">
            Encryption & Cryptography Tools
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-8 leading-relaxed font-medium">
          Professional-grade cryptographic tools directly in your browser. 
          Encrypt text with <span className="text-primary font-bold">AES-256</span>, 
          generate <span className="text-primary font-bold">RSA</span> keys, 
          or verify <span className="text-primary font-bold">JWT</span> tokens instantly.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Zap className="w-4 h-4 text-primary" />
          Fast & Local
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Lock className="w-4 h-4 text-primary" />
          No Data Storage
        </div>
      </div>
    </div>
  );
}
