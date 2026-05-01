'use client';

import { useState } from 'react';
import { Copy, Check, Trash2, AlertTriangle, ArrowDownUp } from 'lucide-react';
import { base64Encode, base64Decode } from '@/lib/encode-tools';
import { motion } from 'framer-motion';

export default function Base64Panel() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setOutputText(base64Encode(inputText, urlSafe));
      setError('');
    } catch (err) {
      setError('Encoding failed.');
    }
  };

  const handleDecode = () => {
    try {
      setOutputText(base64Decode(inputText));
      setError('');
    } catch (err) {
      setError('Invalid Base64 string.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-semibold">Input</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text or Base64 string..."
          className="w-full h-32 bg-secondary/30 border border-border rounded-2xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-medium"
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="urlSafe"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="urlSafe" className="text-xs text-muted-foreground cursor-pointer">URL-Safe Base64</label>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEncode}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Encode to Base64
            </button>
            <button
              onClick={handleDecode}
              className="px-6 py-2 bg-secondary text-foreground border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all"
            >
              Decode Base64
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-[10px] text-yellow-700 flex gap-2 items-start">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          Base64 is an <strong>encoding</strong> scheme, not encryption. Anyone can decode it. 
          Do not use Base64 to secure passwords or sensitive data.
        </p>
      </div>

      {error && <p className="text-xs text-red-500 text-center font-bold">{error}</p>}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Output</label>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!outputText}
              className="p-2 bg-secondary/50 border border-border rounded-lg text-muted-foreground hover:text-primary transition-all disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { setInputText(''); setOutputText(''); }}
              className="p-2 bg-secondary/50 border border-border rounded-lg text-muted-foreground hover:text-red-500 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <textarea
          value={outputText}
          readOnly
          placeholder="Result will appear here..."
          className="w-full h-32 bg-secondary/50 border border-border rounded-2xl p-4 font-mono text-sm resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}
