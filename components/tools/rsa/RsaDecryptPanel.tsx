'use client';

import { useState, useCallback } from 'react';
import { Unlock, Loader2, Copy, Check, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';
import { RsaPadding, decryptRsa } from '@/lib/rsa-crypto';
import PaddingSelector from './PaddingSelector';
import { motion, AnimatePresence } from 'framer-motion';

export default function RsaDecryptPanel() {
  const [ciphertext, setCiphertext] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [padding, setPadding] = useState<RsaPadding>('OAEP-SHA256');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleDecrypt = useCallback(async () => {
    if (!ciphertext) return setError('Please enter the ciphertext to decrypt.');
    if (!privateKey) return setError('Private key is required.');
    
    setError('');
    setIsLoading(true);
    
    try {
      const decrypted = await decryptRsa(ciphertext, privateKey, padding);
      setResult(decrypted);
    } catch (err: any) {
      setError('Decryption failed — wrong key or padding scheme mismatch.');
    } finally {
      setIsLoading(false);
    }
  }, [ciphertext, privateKey, padding]);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setCiphertext('');
    setResult('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Ciphertext Input (Base64)</label>
        </div>
        <textarea
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value.trim())}
          placeholder="Paste the encrypted base64 text here..."
          disabled={isLoading}
          className="w-full h-32 bg-secondary/30 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-mono text-sm"
        />
      </div>

      <div className="space-y-6">
        <PaddingSelector value={padding} onChange={setPadding} />
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Private Key (PEM)</label>
          <textarea
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value.trim())}
            placeholder="Paste private key starting with -----BEGIN PRIVATE KEY-----"
            className="w-full h-32 bg-secondary/30 border border-border rounded-xl p-4 font-mono text-[10px] resize-none focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleDecrypt}
          disabled={isLoading}
          className="w-full py-4 bg-secondary text-foreground border border-border rounded-2xl font-bold hover:bg-muted hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:translate-y-0"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Unlock className="w-5 h-5" />}
          {isLoading ? 'Decrypting...' : 'Decrypt with Private Key'}
        </button>

        <div className="flex justify-center items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-medium text-muted-foreground">
            100% Client-side decryption.
          </span>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs text-center font-medium flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Decrypted Plain Text</label>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!result}
              className="p-2 bg-secondary/50 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-all disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleClear}
              className="p-2 bg-secondary/50 border border-border rounded-lg text-muted-foreground hover:text-red-500 hover:border-red-500/50 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <textarea
          value={result}
          readOnly
          placeholder="Decrypted result will appear here..."
          className="w-full h-32 bg-secondary/50 border border-border rounded-2xl p-4 font-medium resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}
