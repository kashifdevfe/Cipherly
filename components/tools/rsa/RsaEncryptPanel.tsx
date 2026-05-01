'use client';

import { useState, useCallback } from 'react';
import { Lock, Loader2, Copy, Check, Trash2, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { RsaPadding, encryptRsa } from '@/lib/rsa-crypto';
import PaddingSelector from './PaddingSelector';
import { motion, AnimatePresence } from 'framer-motion';

export default function RsaEncryptPanel() {
  const [text, setText] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [padding, setPadding] = useState<RsaPadding>('OAEP-SHA256');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncrypt = useCallback(async () => {
    if (!text) return setError('Please enter some text to encrypt.');
    if (!publicKey) return setError('Public key is required.');
    
    setError('');
    setIsLoading(true);
    
    try {
      const encrypted = await encryptRsa(text, publicKey, padding);
      setResult(encrypted);
    } catch (err: any) {
      setError(err.message || 'Encryption failed. Ensure the public key is valid and the text size is within limits.');
    } finally {
      setIsLoading(false);
    }
  }, [text, publicKey, padding]);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
    setResult('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Plain Text Input</label>
          <span className="text-[10px] text-muted-foreground font-mono">{text.length} chars</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encrypt..."
          disabled={isLoading}
          className="w-full h-32 bg-secondary/30 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-medium"
        />
      </div>

      <div className="space-y-6">
        <PaddingSelector value={padding} onChange={setPadding} />
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Public Key (PEM)</label>
          <textarea
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            placeholder="Paste public key starting with -----BEGIN PUBLIC KEY-----"
            className="w-full h-32 bg-secondary/30 border border-border rounded-xl p-4 font-mono text-[10px] resize-none focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 text-[10px] text-muted-foreground">
          <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p>
            RSA can only encrypt data smaller than the key size minus padding overhead. 
            For large data, encrypt the data with AES and then encrypt the AES key with RSA (Hybrid Encryption).
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleEncrypt}
          disabled={isLoading}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:translate-y-0"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
          {isLoading ? 'Encrypting...' : 'Encrypt with Public Key'}
        </button>

        <div className="flex justify-center items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-medium text-muted-foreground">
            100% Client-side. No data is sent to servers.
          </span>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs text-center font-medium"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Encrypted Output (Base64)</label>
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
          placeholder="Ciphertext will appear here..."
          className="w-full h-32 bg-secondary/50 border border-border rounded-2xl p-4 font-mono text-sm resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}
