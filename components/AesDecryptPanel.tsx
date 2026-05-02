'use client';

import { useState, useCallback, useEffect } from 'react';
import { Unlock, Loader2, Copy, Check, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';
import CipherModeSelector from './CipherModeSelector';
import KeyInput from './KeyInput';
import IvInput from './IvInput';
import { AesMode, FormatType, KeySize, decryptAes, bytesToString } from '@/lib/aes-crypto';
import { motion, AnimatePresence } from 'framer-motion';

export default function AesDecryptPanel() {
  const [ciphertext, setCiphertext] = useState('');
  const [mode, setMode] = useState<AesMode>('GCM');
  const [padding, setPadding] = useState<'PKCS5Padding' | 'NoPadding'>('NoPadding');
  const [key, setKey] = useState('');
  const [keyFormat, setKeyFormat] = useState<FormatType>('Hex');
  const [keySize, setKeySize] = useState<KeySize>(256);
  const [iv, setIv] = useState('');
  const [ivFormat, setIvFormat] = useState<FormatType>('Hex');
  const [tagLength, setTagLength] = useState(128);
  const [cipherFormat, setCipherFormat] = useState<FormatType>('Base64');
  
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Auto-logic for padding
  useEffect(() => {
    if (mode === 'GCM' || mode === 'CTR') {
      setPadding('NoPadding');
    } else {
      setPadding('PKCS5Padding');
    }
  }, [mode]);

  const handleDecrypt = useCallback(async () => {
    if (!ciphertext) return setError('Please enter the ciphertext to decrypt.');
    if (!key) return setError('Secret key is required.');
    if (mode !== 'ECB' && !iv) return setError('IV is required for decryption.');

    setError('');
    setIsLoading(true);
    
    try {
      const decryptedBytes = await decryptAes(
        ciphertext,
        cipherFormat,
        key,
        keyFormat,
        keySize,
        mode,
        iv,
        ivFormat,
        tagLength
      );
      
      const decryptedText = bytesToString(decryptedBytes);
      setResult(decryptedText);
    } catch (err: any) {
      setError('Decryption failed — check your key, IV, and cipher mode.');
      setResult('');
    } finally {
      setIsLoading(false);
    }
  }, [ciphertext, cipherFormat, key, keyFormat, keySize, mode, iv, ivFormat, tagLength]);

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
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Ciphertext Input</label>
          <div className="flex gap-2 p-1 bg-secondary/50 rounded-lg border border-border w-fit">
            {['Base64', 'Hex'].map((f) => (
              <button
                key={f}
                onClick={() => setCipherFormat(f as FormatType)}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                  cipherFormat === f 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value.trim())}
          placeholder={`Paste ${cipherFormat} encoded ciphertext here...`}
          disabled={isLoading}
          className="w-full h-32 bg-secondary/30 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-mono text-sm"
        />
      </div>

      <div className="space-y-6">
        <CipherModeSelector value={mode} onChange={setMode} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Padding</label>
            <select
              value={padding}
              onChange={(e) => setPadding(e.target.value as any)}
              disabled={mode === 'GCM' || mode === 'CTR'}
              className="w-full bg-card text-foreground border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50 cursor-pointer"
            >
              <option value="PKCS5Padding">PKCS5Padding</option>
              <option value="NoPadding">NoPadding</option>
            </select>
          </div>

          {mode === 'GCM' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">GCM Tag Length</label>
              <select
              value={tagLength}
              onChange={(e) => setTagLength(Number(e.target.value))}
              className="w-full bg-card text-foreground border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
            >
                {[128, 120, 112, 104, 96].map((len) => (
                  <option key={len} value={len}>{len} bits</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <KeyInput 
          value={key} 
          onChange={setKey} 
          format={keyFormat} 
          onFormatChange={setKeyFormat}
          keySize={keySize}
          onKeySizeChange={setKeySize}
        />

        <IvInput 
          visible={mode !== 'ECB'} 
          value={iv} 
          onChange={setIv} 
          format={ivFormat} 
          onFormatChange={setIvFormat} 
          label="Used Initialization Vector (IV)"
        />
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleDecrypt}
          disabled={isLoading}
          className="premium-btn w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Decrypting...
            </>
          ) : (
            <>
              <Unlock className="w-5 h-5" />
              Decrypt Now
            </>
          )}
        </button>

        <div className="flex justify-center items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-medium text-muted-foreground">
            100% Client-Side Decryption.
          </span>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center font-medium flex items-center justify-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4 pt-4 border-t border-border/50">
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
          placeholder="Decrypted output will appear here..."
          className="w-full h-32 bg-secondary/50 border border-border rounded-2xl p-4 font-medium resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}
