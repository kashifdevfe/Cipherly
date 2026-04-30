'use client';

import { useState } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';

interface OutputBoxProps {
  label: string;
  value: string;
  onClear?: () => void;
  readOnly?: boolean;
  placeholder?: string;
}

export default function OutputBox({ label, value, onClear, readOnly = true, placeholder }: OutputBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const charCount = value.length;
  const byteCount = new TextEncoder().encode(value).length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
          <span>{charCount} chars</span>
          <span>{byteCount} bytes</span>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          className="w-full h-32 bg-secondary/50 border border-border rounded-lg p-4 focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-sm resize-none"
        />
        
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <button
            onClick={handleCopy}
            disabled={!value}
            className="p-2 bg-background/80 backdrop-blur border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-sm disabled:opacity-50"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          {onClear && (
            <button
              onClick={onClear}
              className="p-2 bg-background/80 backdrop-blur border border-border rounded-lg text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-all shadow-sm"
              title="Clear text"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
