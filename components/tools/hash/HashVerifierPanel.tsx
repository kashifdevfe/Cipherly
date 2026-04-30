'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Search } from 'lucide-react';
import { generateHash } from '@/lib/hash-crypto';
import AlgorithmTabs, { HashAlgo } from './AlgorithmTabs';
import { motion } from 'framer-motion';

export default function HashVerifierPanel() {
  const [text, setText] = useState('');
  const [knownHash, setKnownHash] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgo>('MD5');
  const [result, setResult] = useState<{ match: boolean; computed: string } | null>(null);

  const handleVerify = async () => {
    if (!text || !knownHash) return;
    const computed = await generateHash(text, algorithm, 'Hex');
    const match = computed.toLowerCase() === knownHash.trim().toLowerCase();
    setResult({ match, computed });
  };

  return (
    <div className="space-y-6">
      <AlgorithmTabs value={algorithm} onChange={setAlgorithm} />

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Text to Verify</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or string..."
            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Known Hash to Compare</label>
          <input
            type="text"
            value={knownHash}
            onChange={(e) => setKnownHash(e.target.value)}
            placeholder="Paste known hash here..."
            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all font-mono text-sm"
          />
        </div>

        <button
          onClick={handleVerify}
          className="premium-btn w-full py-4 bg-primary text-black rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Verify Integrity
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 rounded-3xl border text-center space-y-4 ${
            result.match 
              ? 'bg-green-500/10 border-green-500/20 text-green-500' 
              : 'bg-red-500/10 border-red-500/20 text-red-500'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            {result.match ? (
              <>
                <CheckCircle2 className="w-12 h-12" />
                <span className="text-2xl font-black">MATCH</span>
              </>
            ) : (
              <>
                <XCircle className="w-12 h-12" />
                <span className="text-2xl font-black">NO MATCH</span>
              </>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Computed Hash:</p>
            <p className="font-mono text-xs break-all">{result.computed}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
