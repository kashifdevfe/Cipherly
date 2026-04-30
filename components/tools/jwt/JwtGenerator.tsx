'use client';

import { useState } from 'react';
import { Zap, Copy, Check, Plus, Trash2, RefreshCw } from 'lucide-react';
import { signJwt } from '@/lib/jwt-tools';
import { motion, AnimatePresence } from 'framer-motion';

export default function JwtGenerator() {
  const [algorithm, setAlgorithm] = useState('HS256');
  const [header, setHeader] = useState({ alg: 'HS256', typ: 'JWT' });
  const [payload, setPayload] = useState<any>({
    sub: '1234567890',
    name: 'John Doe',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  });
  const [secret, setSecret] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAddClaim = () => {
    const key = prompt('Claim key:');
    if (!key) return;
    const val = prompt('Claim value:');
    setPayload({ ...payload, [key]: val });
  };

  const handleGenerate = async () => {
    try {
      const token = await signJwt(
        { ...header, alg: algorithm },
        payload,
        algorithm.startsWith('HS') ? secret : privateKey,
        algorithm
      );
      setResult(token);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as any)}
              className="w-full bg-primary text-black font-bold border border-primary/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
            >
              <option value="HS256">HS256 (HMAC + SHA-256)</option>
              <option value="HS384">HS384 (HMAC + SHA-384)</option>
              <option value="HS512">HS512 (HMAC + SHA-512)</option>
              <option value="RS256">RS256 (RSA + SHA-256)</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Payload Claims</label>
              <button
                onClick={handleAddClaim}
                className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" />
                Add Custom Claim
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto p-2 bg-secondary/20 rounded-xl border border-border">
              {Object.entries(payload).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <input
                      readOnly
                      value={key}
                      className="bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-xs font-mono"
                    />
                    <input
                      value={val as string}
                      onChange={(e) => setPayload({ ...payload, [key]: e.target.value })}
                      className="bg-secondary/50 border border-border rounded-lg px-3 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newPayload = { ...payload };
                      delete newPayload[key];
                      setPayload(newPayload);
                    }}
                    className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {algorithm.startsWith('HS') ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Secret Key</label>
                <button
                  onClick={() => setSecret(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))}
                  className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline"
                >
                  <RefreshCw className="w-3 h-3" />
                  Generate Random
                </button>
              </div>
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter HMAC secret..."
                className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all font-mono text-sm"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium">Private Key (PEM)</label>
              <textarea
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Paste RSA Private Key (PKCS#8)..."
                className="w-full h-40 bg-secondary/30 border border-border rounded-xl p-4 font-mono text-[10px] resize-none focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
          )}

          <button
            onClick={handleGenerate}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Generate Signed JWT
          </button>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Generated Token</label>
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
          <div className="w-full p-4 bg-secondary/50 border border-border rounded-2xl font-mono text-xs break-all text-primary select-all">
            {result}
          </div>
        </motion.div>
      )}
    </div>
  );
}
