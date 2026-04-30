'use client';

import { useState } from 'react';
import { ShieldCheck, ShieldAlert, Loader2, Search } from 'lucide-react';
import { verifyJwt, isTokenExpired, base64urlDecode } from '@/lib/jwt-tools';
import { motion, AnimatePresence } from 'framer-motion';

export default function JwtValidator() {
  const [token, setToken] = useState('');
  const [secretOrPublic, setSecretOrPublic] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    expired: boolean;
    payload: any;
    error?: string;
  } | null>(null);

  const handleValidate = async () => {
    if (!token || !secretOrPublic) return;
    setIsVerifying(true);
    setResult(null);
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      const payload = JSON.parse(base64urlDecode(parts[1]));
      
      const isValid = await verifyJwt(token, secretOrPublic);
      const expired = payload.exp ? isTokenExpired(payload.exp) : false;
      
      setResult({ valid: isValid, expired, payload });
    } catch (err: any) {
      setResult({ valid: false, expired: false, payload: null, error: err.message });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-sm font-semibold">JWT Token to Validate</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste JWT token here..."
            className="w-full h-40 bg-secondary/30 border border-border rounded-2xl p-4 font-mono text-[10px] focus:ring-2 focus:ring-primary outline-none transition-all resize-none break-all"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-semibold">Secret or Public Key (PEM)</label>
          <textarea
            value={secretOrPublic}
            onChange={(e) => setSecretOrPublic(e.target.value)}
            placeholder="Paste HS secret or RSA Public Key (SPKI PEM)..."
            className="w-full h-40 bg-secondary/30 border border-border rounded-2xl p-4 font-mono text-[10px] focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
          />
        </div>
      </div>

      <button
        onClick={handleValidate}
        disabled={isVerifying}
        className="w-full py-4 bg-secondary text-foreground border border-border rounded-2xl font-bold hover:bg-muted transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        {isVerifying ? 'Verifying Signature...' : 'Validate JWT Token'}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-8 rounded-3xl border ${
              result.valid && !result.expired
                ? 'bg-green-500/10 border-green-500/20 text-green-500'
                : 'bg-red-500/10 border-red-500/20 text-red-500'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              {result.valid && !result.expired ? (
                <>
                  <ShieldCheck className="w-16 h-16" />
                  <div>
                    <h3 className="text-2xl font-black">VALID TOKEN</h3>
                    <p className="text-xs font-medium opacity-80">Signature is authentic and token is not expired.</p>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-16 h-16" />
                  <div>
                    <h3 className="text-2xl font-black">INVALID OR EXPIRED</h3>
                    <p className="text-xs font-medium opacity-80">
                      {result.error || (!result.valid ? 'Signature verification failed.' : 'Token has expired.')}
                    </p>
                  </div>
                </>
              )}
            </div>

            {result.payload && (
              <div className="mt-8 pt-8 border-t border-current/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase opacity-60">Signature</span>
                  <span className="text-xs font-bold">{result.valid ? 'AUTHENTIC' : 'FAILED'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase opacity-60">Expiration</span>
                  <span className="text-xs font-bold">{result.expired ? 'EXPIRED' : 'ACTIVE'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase opacity-60">Issuer</span>
                  <span className="text-xs font-bold truncate">{result.payload.iss || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase opacity-60">Subject</span>
                  <span className="text-xs font-bold truncate">{result.payload.sub || 'N/A'}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
