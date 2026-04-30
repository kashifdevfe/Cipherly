'use client';

import { RefreshCw } from 'lucide-react';
import FormatSelector from './FormatSelector';
import { FormatType, generateRandomBytes, encodeFormat } from '@/lib/aes-crypto';

interface IvInputProps {
  value: string;
  onChange: (value: string) => void;
  format: FormatType;
  onFormatChange: (format: FormatType) => void;
  visible: boolean;
  label?: string;
}

export default function IvInput({ 
  value, 
  onChange, 
  format, 
  onFormatChange, 
  visible,
  label = "Initialization Vector (IV)"
}: IvInputProps) {
  if (!visible) return null;

  const handleGenerate = () => {
    const bytes = generateRandomBytes(16);
    const encoded = encodeFormat(bytes, format);
    onChange(encoded);
  };

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <FormatSelector value={format} onChange={onFormatChange} />
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter 16-byte IV..."
          className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-sm"
        />
        <button
          onClick={handleGenerate}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
          title="Generate random IV"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground px-1">
        IV must be exactly 16 bytes (128-bit) for AES.
      </p>
    </div>
  );
}
