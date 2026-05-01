'use client';

import { FormatType } from '@/lib/aes-crypto';

interface FormatSelectorProps {
  value: FormatType;
  onChange: (value: FormatType) => void;
  options?: FormatType[];
}

export default function FormatSelector({ value, onChange, options = ['Plain Text', 'Base64', 'Hex'] }: FormatSelectorProps) {
  return (
    <div className="flex gap-1 p-1 bg-secondary/50 rounded-lg border border-border w-fit">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
            value === opt 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
