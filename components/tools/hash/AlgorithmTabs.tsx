'use client';

import { motion } from 'framer-motion';

export type HashAlgo = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

interface AlgorithmTabsProps {
  value: HashAlgo;
  onChange: (value: HashAlgo) => void;
}

const algos: HashAlgo[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'];

export default function AlgorithmTabs({ value, onChange }: AlgorithmTabsProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex p-1 bg-secondary/50 backdrop-blur-sm border border-border rounded-xl">
        {algos.map((algo) => (
          <button
            key={algo}
            onClick={() => onChange(algo)}
            className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              value === algo ? 'text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {value === algo && (
              <motion.div
                layoutId="active-hash-tab"
                className="absolute inset-0 bg-primary rounded-lg shadow-sm"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{algo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
