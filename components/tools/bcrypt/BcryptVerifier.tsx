'use client';

import { useState } from 'react';
import { Search, Eye, EyeOff, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { verifyBcryptHash } from '@/lib/bcrypt-hash';
import { motion, AnimatePresence } from 'framer-motion';

export default function BcryptVerifier() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hash, setHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);

  const handleVerify = async () => {
    if (!password || !hash) return;
    setIsVerifying(true);
    setResult(null);
    try {
      const match = await verifyBcryptHash(password, hash);
      setResult(match);
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Password to Verify</label>
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Bcrypt Hash to Compare</label>
          <input
            type="text"
            value={hash}
            onChange={(e) => setHash(e.target.value.trim())}
            placeholder="Paste $2b$ or $2a$ hash here..."
            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all font-mono text-sm"
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={!password || !hash || isVerifying}
          className="w-full py-4 bg-secondary text-foreground border border-border rounded-2xl font-bold hover:bg-muted transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          {isVerifying ? 'Verifying...' : 'Verify Password Match'}
        </button>
      </div>

      <AnimatePresence>
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-3xl border text-center space-y-4 ${
              result 
                ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                : 'bg-red-500/10 border-red-500/20 text-red-500'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              {result ? (
                <>
                  <CheckCircle2 className="w-12 h-12" />
                  <span className="text-2xl font-black">MATCH FOUND</span>
                  <p className="text-xs opacity-80">The provided password matches the bcrypt hash.</p>
                </>
              ) : (
                <>
                  <XCircle className="w-12 h-12" />
                  <span className="text-2xl font-black">NO MATCH</span>
                  <p className="text-xs opacity-80">The password does not match the provided hash.</p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
