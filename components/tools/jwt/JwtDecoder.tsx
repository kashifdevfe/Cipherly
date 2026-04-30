'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, Clock } from 'lucide-react';
import { base64urlDecode, isTokenExpired } from '@/lib/jwt-tools';
import JsonViewer from './JsonViewer';
import ClaimBadge from './ClaimBadge';
import { motion, AnimatePresence } from 'framer-motion';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState<{ header: any; payload: any; signature: string } | null>(null);
  const [error, setError] = useState('');

  const handleDecode = (input: string) => {
    setToken(input);
    if (!input) {
      setDecoded(null);
      setError('');
      return;
    }

    try {
      const parts = input.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format. Must have 3 parts separated by dots.');

      const header = JSON.parse(base64urlDecode(parts[0]));
      const payload = JSON.parse(base64urlDecode(parts[1]));
      const signature = parts[2];

      setDecoded({ header, payload, signature });
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to decode JWT.');
      setDecoded(null);
    }
  };

  const expired = decoded?.payload?.exp ? isTokenExpired(decoded.payload.exp) : false;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <label className="text-sm font-semibold">Encoded JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => handleDecode(e.target.value)}
          placeholder="Paste your JWT token here (xxxxx.yyyyy.zzzzz)"
          className="w-full h-32 bg-secondary/30 border border-border rounded-2xl p-4 font-mono text-xs focus:ring-2 focus:ring-primary outline-none transition-all resize-none break-all"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {decoded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="flex flex-wrap gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase ${
              expired ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'
            }`}>
              <Clock className="w-3 h-3" />
              {expired ? 'Expired' : 'Valid (Not Expired)'}
            </div>
            <div className="px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-[10px] font-bold uppercase text-muted-foreground">
              Alg: {decoded.header.alg}
            </div>
            {decoded.payload.sub && <ClaimBadge claim="sub" value={decoded.payload.sub} />}
            {decoded.payload.exp && <ClaimBadge claim="exp" value={decoded.payload.exp} />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <JsonViewer data={decoded.header} label="Header" />
              <JsonViewer data={decoded.payload} label="Payload" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase text-muted-foreground">Signature</label>
              <div className="p-4 bg-secondary/30 border border-border rounded-xl font-mono text-[10px] break-all opacity-60">
                {decoded.signature}
              </div>
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl text-[10px] text-muted-foreground leading-relaxed flex gap-3">
                <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                <p>
                  Decoding only reveals the content. To verify the integrity of the token, 
                  you must use the <strong>Validator</strong> tab with the correct secret or public key.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
