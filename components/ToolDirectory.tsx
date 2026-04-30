'use client';

import Link from 'next/link';
import { Lock, Key, Fingerprint, Eye, ArrowLeftRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const tools = [
  {
    title: 'AES Encryption',
    desc: 'Advanced Encryption Standard (GCM, CBC, CTR, ECB)',
    href: '/',
    icon: Lock,
    color: 'bg-primary/10 text-primary',
    badge: 'Popular'
  },
  {
    title: 'RSA Encryption',
    desc: 'Asymmetric cryptography with 2048/4096-bit key generation.',
    href: '/tools/rsa-encryption',
    icon: Key,
    color: 'bg-emerald-400/10 text-emerald-400',
    badge: 'Advanced'
  },
  {
    title: 'JWT Debugger',
    desc: 'Decode, generate, and validate JSON Web Tokens instantly.',
    href: '/tools/jwt-decoder',
    icon: Eye,
    color: 'bg-cyan-400/10 text-cyan-400',
  },
  {
    title: 'Hash Generator',
    desc: 'Create MD5, SHA-1, SHA-256, and SHA-512 hashes.',
    href: '/tools/md5-hash-generator',
    icon: Fingerprint,
    color: 'bg-teal-400/10 text-teal-400',
  },
  {
    title: 'Bcrypt Tool',
    desc: 'Secure password hashing with custom cost factors.',
    href: '/tools/bcrypt-hash-generator',
    icon: ShieldCheck,
    color: 'bg-lime-400/10 text-lime-400',
  },
  {
    title: 'Base64 & HMAC',
    desc: 'Encode/decode Base64 or generate HMAC signatures.',
    href: '/tools/base64-encode-decode',
    icon: ArrowLeftRight,
    color: 'bg-sky-400/10 text-sky-400',
  },
];

export default function ToolDirectory() {
  return (
    <section className="space-y-10 py-20">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-black tracking-tight">Professional Security Toolkit</h2>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto">
          Industrial-grade cryptographic utilities optimized for performance and privacy. 
          Everything runs locally in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, i) => (
          <Link key={tool.href} href={tool.href} className="group">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass p-8 rounded-[2rem] border border-border hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                  <tool.icon className="w-7 h-7" />
                </div>
                {tool.badge && (
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider border border-primary/20">
                    {tool.badge}
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-2xl tracking-tight">{tool.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-black text-primary group-hover:gap-4 transition-all">
                OPEN TOOL
                <span className="w-6 h-[2px] bg-primary group-hover:w-10 transition-all" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
