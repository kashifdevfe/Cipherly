'use client';

import { useState } from 'react';
import { RefreshCw, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import FormatSelector from './FormatSelector';
import { FormatType, KeySize, generateRandomBytes, encodeFormat } from '@/lib/aes-crypto';

interface KeyInputProps {
  value: string;
  onChange: (value: string) => void;
  format: FormatType;
  onFormatChange: (format: FormatType) => void;
  keySize: KeySize;
  onKeySizeChange: (size: KeySize) => void;
}

export default function KeyInput({ 
  value, 
  onChange, 
  format, 
  onFormatChange, 
  keySize, 
  onKeySizeChange 
}: KeyInputProps) {
  const [showKey, setShowKey] = useState(false);

  const handleGenerate = () => {
    const bytes = generateRandomBytes(keySize / 8);
    const encoded = encodeFormat(bytes, format);
    onChange(encoded);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Key Size (bits)</label>
          <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg border border-border w-fit">
            {[128, 192, 256].map((size) => (
              <button
                key={size}
                onClick={() => onKeySizeChange(size as KeySize)}
                className={`px-4 py-1 text-xs font-bold rounded-md transition-all ${
                  keySize === size 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Secret Key Format</label>
          <FormatSelector value={format} onChange={onFormatChange} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Secret Key</label>
          <button
            onClick={handleGenerate}
            className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Generate Random Key
          </button>
        </div>
        
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${keySize/8} byte key...`}
            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-sm"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {format === 'Plain Text' && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-[10px] font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Plain-text secret keys are weak. Use Hex/Base64 or PBKDF2-derived keys for production.
          </div>
        )}
      </div>
    </div>
  );
}
