'use client';

import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, AlertTriangle, Fingerprint, Zap } from 'lucide-react';
import { generateHash } from '@/lib/hash-crypto';
import AlgorithmTabs, { HashAlgo } from './AlgorithmTabs';
import { motion, AnimatePresence } from 'framer-motion';

export default function HashGeneratorPanel() {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgo>('MD5');
  const [output, setOutput] = useState<'Hex' | 'Base64' | 'UPPERCASE HEX'>('Hex');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const byteCount = useMemo(() => new TextEncoder().encode(text).length, [text]);

  const handleGenerate = async () => {
    if (!text) return;
    const hash = await generateHash(text, algorithm, output);
    setResult(hash);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <AlgorithmTabs value={algorithm} onChange={setAlgorithm} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Input Text</label>
          <div className="flex gap-4 text-[10px] text-muted-foreground font-mono">
            <span>{text.length} chars</span>
            <span>{byteCount} bytes</span>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 bg-secondary/30 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-medium"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg border border-border w-fit">
          {['Hex', 'Base64', 'UPPERCASE HEX'].map((f) => (
            <button
              key={f}
              onClick={() => setOutput(f as any)}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                output === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="premium-btn w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Generate Hash
        </button>
      </div>

      {(algorithm === 'MD5' || algorithm === 'SHA-1') && (
        <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-[10px] text-yellow-700 flex gap-2 items-start">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            {algorithm} is cryptographically broken and should not be used for security-sensitive applications like password hashing. 
            Use SHA-256 or SHA-512 instead. {algorithm} is safe for checksums and non-cryptographic purposes.
          </p>
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Computed {algorithm} Hash</label>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 bg-secondary border border-border rounded-full text-muted-foreground">
                  {result.length} chars / {result.length * 4}-bit
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="w-full p-4 bg-secondary/50 border border-border rounded-2xl font-mono text-sm break-all text-primary select-all">
              {result}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
