'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Eye, PlusCircle, ShieldCheck } from 'lucide-react';

const JwtDecoder = dynamic(() => import('./JwtDecoder'), { ssr: false });
const JwtGenerator = dynamic(() => import('./JwtGenerator'), { ssr: false });
const JwtValidator = dynamic(() => import('./JwtValidator'), { ssr: false });

const tabs = [
  { id: 'decode', label: 'Decoder', icon: Eye },
  { id: 'generate', label: 'Generator', icon: PlusCircle },
  { id: 'validate', label: 'Validator', icon: ShieldCheck },
];

export default function JwtTabs() {
  const [activeTab, setActiveTab] = useState('decode');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-center">
        <div className="flex p-1 bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-jwt-tab"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <tab.icon className={`relative z-10 w-4 h-4 ${activeTab === tab.id ? 'text-primary-foreground' : ''}`} />

              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="glass rounded-3xl p-6 md:p-8 min-h-[500px]"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'decode' && (
            <motion.div
              key="decode"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <JwtDecoder />
            </motion.div>
          )}
          {activeTab === 'generate' && (
            <motion.div
              key="generate"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <JwtGenerator />
            </motion.div>
          )}
          {activeTab === 'validate' && (
            <motion.div
              key="validate"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <JwtValidator />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
