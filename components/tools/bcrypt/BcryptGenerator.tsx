'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff, Loader2, Copy, Check, Info } from 'lucide-react';
import { generateBcryptHash } from '@/lib/bcrypt-hash';
import CostFactorSlider from './CostFactorSlider';
import { motion, AnimatePresence } from 'framer-motion';

export default function BcryptGenerator() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [costFactor, setCostFactor] = useState(10);
  const [isHashing, setIsHashing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleHash = async () => {
    if (!password) return;
    setIsHashing(true);
    try {
      const hash = await generateBcryptHash(password, costFactor);
      setResult(hash);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHashing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Password to Hash</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 pr-12 focus:ring-2 focus:ring-primary outline-none transition-all font-mono"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <CostFactorSlider value={costFactor} onChange={setCostFactor} />

        <button
          onClick={handleHash}
          disabled={!password || isHashing}
          className="premium-btn w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isHashing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
          {isHashing ? 'Hashing (slow by design)...' : 'Generate Bcrypt Hash'}
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-muted-foreground">Bcrypt Hash Result</label>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="p-2 bg-secondary/50 border border-border rounded-lg text-muted-foreground hover:text-primary transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="w-full p-4 bg-secondary/50 border border-border rounded-2xl font-mono text-sm break-all text-primary">
            {result}
          </div>
          <div className="flex gap-2 p-3 rounded-xl bg-secondary/30 border border-border text-[10px] text-muted-foreground">
            <Info className="w-4 h-4 shrink-0 text-primary" />
            <p>
              Bcrypt includes a random salt in the output. Hashing the same password again will result 
              in a different string — this is normal and expected behavior.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
