'use client';

import { useState } from 'react';
import { Upload, FileText, Loader2, Copy, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FileToBase64() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        alert('File size too large. Max 5MB for Base64 conversion.');
        return;
      }
      setFile(selected);
      setResult('');
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const b64 = e.target?.result as string;
      // Remove data:header part if it exists
      const parts = b64.split(',');
      setResult(parts.length > 1 ? parts[1] : parts[0]);
      setIsConverting(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="relative group cursor-pointer block">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className={`border-2 border-dashed rounded-3xl p-8 text-center space-y-3 transition-all ${
            file ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/30 bg-secondary/20'
          }`}>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-sm">{file ? file.name : 'Select a file'}</p>
              <p className="text-[10px] text-muted-foreground">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Max size: 5MB'}
              </p>
            </div>
          </div>
        </label>

        <button
          onClick={handleConvert}
          disabled={!file || isConverting}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isConverting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
          {isConverting ? 'Converting...' : 'Convert to Base64'}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase text-muted-foreground">Base64 String</label>
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
            <textarea
              readOnly
              value={result}
              className="w-full h-32 bg-secondary/50 border border-border rounded-xl p-4 font-mono text-[10px] resize-none focus:outline-none opacity-80"
            />
            <div className="flex gap-2 p-3 rounded-xl bg-secondary/30 border border-border text-[10px] text-muted-foreground">
              <Info className="w-4 h-4 shrink-0 text-primary" />
              <p>Base64 increases file size by approximately 33.3% compared to binary format.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
