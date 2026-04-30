'use client';

import { useState } from 'react';
import { Upload, File, Loader2, Copy, Check, Info } from 'lucide-react';
import { generateFileHash } from '@/lib/hash-crypto';
import AlgorithmTabs, { HashAlgo } from './AlgorithmTabs';
import { motion } from 'framer-motion';

export default function FileHashPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [algorithm, setAlgorithm] = useState<HashAlgo>('MD5');
  const [isComputing, setIsComputing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 100 * 1024 * 1024) {
        alert('File size too large. Max 100MB.');
        return;
      }
      setFile(selected);
      setResult('');
    }
  };

  const handleCompute = async () => {
    if (!file) return;
    setIsComputing(true);
    try {
      const hash = await generateFileHash(file, algorithm, () => {});
      setResult(hash);
    } catch (err) {
      console.error(err);
    } finally {
      setIsComputing(false);
    }
  };

  return (
    <div className="space-y-6">
      <AlgorithmTabs value={algorithm} onChange={setAlgorithm} />

      <div className="space-y-4">
        <label className="relative group cursor-pointer block">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className={`border-2 border-dashed rounded-3xl p-10 text-center space-y-4 transition-all ${
            file ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/30 bg-secondary/20'
          }`}>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="font-bold">{file ? file.name : 'Select a file or drag & drop'}</p>
              <p className="text-xs text-muted-foreground">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Max file size: 100MB'}
              </p>
            </div>
          </div>
        </label>

        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-[10px] text-blue-500">
          <Info className="w-4 h-4 shrink-0" />
          Files are processed entirely in your browser. They are never uploaded to any server.
        </div>

        <button
          onClick={handleCompute}
          disabled={!file || isComputing}
          className="premium-btn w-full py-4 bg-primary text-black rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isComputing ? <Loader2 className="w-5 h-5 animate-spin" /> : <File className="w-5 h-5" />}
          {isComputing ? 'Computing Hash...' : 'Compute File Hash'}
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-muted-foreground">File Checksum ({algorithm})</label>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="w-full p-4 bg-secondary/50 border border-border rounded-2xl font-mono text-sm break-all">
            {result}
          </div>
        </motion.div>
      )}
    </div>
  );
}
