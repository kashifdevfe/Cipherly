'use client';

import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Key, RefreshCw, Copy, Check, Zap } from 'lucide-react';
import { generateHmac, verifyHmac } from '@/lib/encode-tools';
import { motion, AnimatePresence } from 'framer-motion';

export default function HmacPanel() {
  const [message, setMessage] = useState('');
  const [secret, setSecret] = useState('');
  const [algo, setAlgo] = useState<'SHA-256' | 'SHA-384' | 'SHA-512'>('SHA-256');
  const [outputType, setOutputType] = useState<'Hex' | 'Base64'>('Hex');
  
  const [generatedHmac, setGeneratedHmac] = useState('');
  const [verifyHmacInput, setVerifyHmacInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!message || !secret) return;
    const hmac = await generateHmac(message, secret, algo, outputType);
    setGeneratedHmac(hmac);
  };

  const handleVerify = async () => {
    if (!message || !secret || !verifyHmacInput) return;
    const isValid = await verifyHmac(message, secret, verifyHmacInput, algo, outputType);
    setVerificationResult(isValid);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-sm font-semibold">Message / Data</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message to sign or verify..."
            className="w-full h-32 bg-secondary/30 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-medium"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Secret Key</label>
            <button
              onClick={() => setSecret(Math.random().toString(36).substring(2, 15))}
              className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3 h-3" />
              Random
            </button>
          </div>
          <input
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter HMAC secret..."
            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all font-mono text-sm"
          />
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Algorithm</label>
            <div className="flex gap-2">
              {['SHA-256', 'SHA-384', 'SHA-512'].map((a) => (
                <button
                  key={a}
                  onClick={() => setAlgo(a as any)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                    algo === a ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary/30 border-border text-muted-foreground'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 p-6 rounded-3xl bg-secondary/20 border border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm">Generate HMAC</h3>
            <div className="flex gap-1 p-0.5 bg-secondary rounded-lg border border-border">
              {['Hex', 'Base64'].map(f => (
                <button
                  key={f}
                  onClick={() => setOutputType(f as any)}
                  className={`px-3 py-1 rounded-md text-[8px] font-bold transition-all ${
                    outputType === f ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Generate Signature
          </button>
          {generatedHmac && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">HMAC ({outputType})</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedHmac);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <div className="w-full p-3 bg-secondary border border-border rounded-xl font-mono text-[10px] break-all select-all">
                {generatedHmac}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 p-6 rounded-3xl bg-secondary/20 border border-border">
          <h3 className="font-bold text-sm">Verify HMAC</h3>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Expected HMAC</label>
            <input
              type="text"
              value={verifyHmacInput}
              onChange={(e) => setVerifyHmacInput(e.target.value)}
              placeholder="Paste HMAC to verify..."
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2 outline-none focus:ring-1 focus:ring-primary transition-all font-mono text-xs"
            />
          </div>
          <button
            onClick={handleVerify}
            className="w-full py-3 bg-secondary text-foreground border border-border rounded-xl font-bold hover:bg-muted transition-all flex items-center justify-center gap-2"
          >
            Verify Signature
          </button>
          
          <AnimatePresence>
            {verificationResult !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-bold text-xs ${
                  verificationResult ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
                }`}
              >
                {verificationResult ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    SIGNATURE VALID
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    SIGNATURE INVALID
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
