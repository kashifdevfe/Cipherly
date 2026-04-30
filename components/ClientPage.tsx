'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Lock, Key, Eye, Fingerprint, ShieldCheck, ArrowLeftRight, BookOpen } from 'lucide-react';
import HowItWorks from './HowItWorks';

// Dynamic imports for performance
const EncryptPanel = dynamic(() => import('./AesEncryptPanel'), { ssr: false });
const DecryptPanel = dynamic(() => import('./AesDecryptPanel'), { ssr: false });
const RsaToolWrapper = dynamic(() => import('./tools/rsa/RsaToolWrapper'), { ssr: false });
const JwtTabs = dynamic(() => import('./tools/jwt/JwtTabs'), { ssr: false });
const HashToolWrapper = dynamic(() => import('./tools/hash/HashToolWrapper'), { ssr: false });
const BcryptToolWrapper = dynamic(() => import('./tools/bcrypt/BcryptToolWrapper'), { ssr: false });
const Base64HmacWrapper = dynamic(() => import('./tools/encode/Base64HmacWrapper'), { ssr: false });

const toolTabs = [
  { id: 'aes', label: 'AES', icon: Lock },
  { id: 'rsa', label: 'RSA', icon: Key },
  { id: 'jwt', label: 'JWT', icon: Eye },
  { id: 'hash', label: 'Hash', icon: Fingerprint },
  { id: 'bcrypt', label: 'Bcrypt', icon: ShieldCheck },
  { id: 'base64', label: 'Encode', icon: ArrowLeftRight },
  { id: 'info', label: 'Docs', icon: BookOpen },
];

export default function ClientPage() {
  const [activeTab, setActiveTab] = useState('aes');

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex justify-center">
        <div className="flex flex-wrap items-center justify-center p-1 bg-secondary/50 backdrop-blur-md border border-border rounded-[1.5rem] gap-1 md:gap-2">
          {toolTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-cyber-tab"
                    className="absolute inset-0 bg-primary rounded-2xl shadow-[0_0_20px_rgba(0,255,156,0.2)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={`relative z-10 w-4 h-4 ${isActive ? 'text-primary-foreground' : ''}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-h-[500px]"
        >
          {activeTab === 'aes' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass rounded-[2.5rem] p-6 md:p-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase">Encrypt</h2>
                </div>
                <EncryptPanel />
              </div>

              <div className="glass rounded-[2.5rem] p-6 md:p-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2.5 bg-secondary rounded-xl">
                    <div className="w-5 h-5 border-2 border-muted-foreground/30 rounded-md" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase">Decrypt</h2>
                </div>
                <DecryptPanel />
              </div>
            </div>
          )}

          {activeTab === 'rsa' && <RsaToolWrapper />}
          {activeTab === 'jwt' && <JwtTabs />}
          {activeTab === 'hash' && <HashToolWrapper />}
          {activeTab === 'bcrypt' && <BcryptToolWrapper />}
          {activeTab === 'base64' && <Base64HmacWrapper />}
          {activeTab === 'info' && (
            <div className="glass rounded-[2.5rem] p-6 md:p-12 max-w-4xl mx-auto">
              <HowItWorks />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
