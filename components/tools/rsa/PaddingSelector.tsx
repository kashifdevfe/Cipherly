'use client';

import { RsaPadding } from '@/lib/rsa-crypto';

interface PaddingSelectorProps {
  value: RsaPadding;
  onChange: (value: RsaPadding) => void;
}

const paddings: { id: RsaPadding; label: string; badge?: string; badgeColor?: string }[] = [
  { id: 'OAEP-SHA256', label: 'OAEP (SHA-256)', badge: 'Recommended', badgeColor: 'bg-green-500/10 text-green-500 border-green-500/20' },
  { id: 'OAEP-SHA1', label: 'OAEP (SHA-1)' },
  { id: 'PKCS1v15', label: 'PKCS#1 v1.5', badge: 'Legacy', badgeColor: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20' },
];

export default function PaddingSelector({ value, onChange }: PaddingSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Padding Scheme</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {paddings.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            className={`p-3 rounded-xl border text-left transition-all relative ${
              value === p.id 
                ? 'bg-primary/10 border-primary' 
                : 'bg-secondary/30 border-border hover:border-primary/50'
            }`}
          >
            <div className="flex flex-col gap-1">
              <span className={`text-xs font-bold ${value === p.id ? 'text-primary' : ''}`}>
                {p.label}
              </span>
              {p.badge && (
                <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border w-fit ${p.badgeColor}`}>
                  {p.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
