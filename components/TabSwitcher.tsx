'use client';

import { motion } from 'framer-motion';
import { Lock, Unlock, BookOpen } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: any;
}

const tabs: Tab[] = [
  { id: 'encrypt', label: 'Encrypt', icon: Lock },
  { id: 'decrypt', label: 'Decrypt', icon: Unlock },
  { id: 'how-it-works', label: 'How It Works', icon: BookOpen },
];

interface TabSwitcherProps {
  activeTab: string;
  onChange: (id: string) => void;
}

export default function TabSwitcher({ activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex p-1 bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
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
  );
}
