'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Fingerprint, Search, FileCode } from 'lucide-react';

const HashGeneratorPanel = dynamic(() => import('./HashGeneratorPanel'), { ssr: false });
const HashVerifierPanel = dynamic(() => import('./HashVerifierPanel'), { ssr: false });
const FileHashPanel = dynamic(() => import('./FileHashPanel'), { ssr: false });

const tabs = [
  { id: 'generate', label: 'Generator', icon: Fingerprint },
  { id: 'verify', label: 'Verifier', icon: Search },
  { id: 'file', label: 'File Hash', icon: FileCode },
];

export default function HashToolWrapper() {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-center">
        <div className="flex p-1 bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-hash-main-tab"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <tab.icon className={`relative z-10 w-4 h-4 ${activeTab === tab.id ? 'text-white' : ''}`} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="glass rounded-3xl p-6 md:p-8 min-h-[400px]"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'generate' && (
            <motion.div
              key="generate"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <HashGeneratorPanel />
            </motion.div>
          )}
          {activeTab === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <HashVerifierPanel />
            </motion.div>
          )}
          {activeTab === 'file' && (
            <motion.div
              key="file"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <FileHashPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
