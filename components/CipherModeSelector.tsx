'use client';

import { AesMode } from '@/lib/aes-crypto';
import { motion } from 'framer-motion';

interface CipherModeSelectorProps {
  value: AesMode;
  onChange: (value: AesMode) => void;
}

const modes: { id: AesMode; label: string; badge?: string; badgeColor?: string }[] = [
  { id: 'GCM', label: 'GCM', badge: 'Recommended', badgeColor: 'bg-green-500/20 text-green-500' },
  { id: 'CBC', label: 'CBC' },
  { id: 'CTR', label: 'CTR' },
  { id: 'ECB', label: 'ECB', badge: 'Not Recommended', badgeColor: 'bg-red-500/20 text-red-500' },
];

export default function CipherModeSelector({ value, onChange }: CipherModeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Cipher Mode</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`relative p-3 rounded-xl border transition-all text-left group ${
                value === mode.id
                  ? 'bg-primary border-primary shadow-[0_0_15px_rgba(0,200,120,0.2)]'
                  : 'bg-secondary/30 border-border hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-sm font-bold ${value === mode.id ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {mode.label}
                </span>

              {mode.badge && (
                <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${value === mode.id ? 'bg-primary-foreground/20 text-primary-foreground' : mode.badgeColor}`}>
                  {mode.badge}
                </span>
              )}
            </div>
          </button>


        ))}
      </div>
    </div>
  );
}
