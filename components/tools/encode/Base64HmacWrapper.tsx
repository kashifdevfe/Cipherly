'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowLeftRight, ShieldCheck, FileCode } from 'lucide-react';

const Base64Panel = dynamic(() => import('./Base64Panel'), { ssr: false });
const HmacPanel = dynamic(() => import('./HmacPanel'), { ssr: false });
const FileToBase64 = dynamic(() => import('./FileToBase64'), { ssr: false });

const tabs = [
  { id: 'base64', label: 'Base64 Text', icon: ArrowLeftRight },
  { id: 'file', label: 'File to Base64', icon: FileCode },
  { id: 'hmac', label: 'HMAC Generator', icon: ShieldCheck },
];

export default function Base64HmacWrapper() {
  const [activeTab, setActiveTab] = useState('base64');

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
                  layoutId="active-encode-tab"
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
          {activeTab === 'base64' && (
            <motion.div
              key="base64"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Base64Panel />
            </motion.div>
          )}
          {activeTab === 'file' && (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FileToBase64 />
            </motion.div>
          )}
          {activeTab === 'hmac' && (
            <motion.div
              key="hmac"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <HmacPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
