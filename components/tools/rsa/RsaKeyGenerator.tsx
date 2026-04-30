'use client';

import { useState } from 'react';
import { RefreshCw, Copy, Check, ShieldAlert } from 'lucide-react';
import { generateRsaKeyPair } from '@/lib/rsa-crypto';
import { motion, AnimatePresence } from 'framer-motion';

export default function RsaKeyGenerator() {
  const [keySize, setKeySize] = useState<512 | 1024 | 2048 | 4096>(2048);
  const [keys, setKeys] = useState<{ publicKey: string; privateKey: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<'pub' | 'priv' | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const newKeys = await generateRsaKeyPair(keySize);
      setKeys(newKeys);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, type: 'pub' | 'priv') => {
    navigator.clipboard.writeText(text);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">RSA Key Size (bits)</label>
          <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg border border-border w-fit">
            {[512, 1024, 2048, 4096].map((size) => (
              <button
                key={size}
                onClick={() => setKeySize(size as any)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
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

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="premium-btn w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin text-primary-foreground" /> : <RefreshCw className="w-5 h-5 text-primary-foreground" />}
          {isGenerating ? 'Generating...' : 'Generate Key Pair'}
        </button>

      </div>

      {(keySize === 512 || keySize === 1024) && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-xs font-medium">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          {keySize}-bit keys are for testing only and are not cryptographically secure for production use.
        </div>
      )}

      {keySize === 4096 && (
        <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider px-2">
          ★ Most Secure (4096-bit)
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-muted-foreground">Public Key (SPKI)</label>
            <button
              onClick={() => keys && copyToClipboard(keys.publicKey, 'pub')}
              disabled={!keys}
              className="p-1.5 hover:bg-secondary rounded-lg transition-colors disabled:opacity-30"
            >
              {copiedKey === 'pub' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <textarea
            readOnly
            value={keys?.publicKey || ''}
            placeholder="Generate keys to see the public key..."
            className="w-full h-48 bg-secondary/30 border border-border rounded-xl p-4 font-mono text-[10px] resize-none focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-muted-foreground">Private Key (PKCS#8)</label>
            <button
              onClick={() => keys && copyToClipboard(keys.privateKey, 'priv')}
              disabled={!keys}
              className="p-1.5 hover:bg-secondary rounded-lg transition-colors disabled:opacity-30"
            >
              {copiedKey === 'priv' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <textarea
            readOnly
            value={keys?.privateKey || ''}
            placeholder="Generate keys to see the private key..."
            className="w-full h-48 bg-secondary/30 border border-border rounded-xl p-4 font-mono text-[10px] resize-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
