'use client';

import dynamic from 'next/dynamic';
import { Key, Lock, Unlock } from 'lucide-react';

const RsaKeyGenerator = dynamic(() => import('./RsaKeyGenerator'), { ssr: false });
const RsaEncryptPanel = dynamic(() => import('./RsaEncryptPanel'), { ssr: false });
const RsaDecryptPanel = dynamic(() => import('./RsaDecryptPanel'), { ssr: false });

export default function RsaToolWrapper() {
  return (
    <div className="space-y-12">
      <section className="glass rounded-3xl p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Key className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">1. Key Pair Generator</h2>
            <p className="text-xs text-muted-foreground">Generate public and private keys for asymmetric cryptography.</p>
          </div>
        </div>
        <RsaKeyGenerator />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="glass rounded-3xl p-6 md:p-8 space-y-8 h-fit">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">2. Encrypt</h2>
              <p className="text-xs text-muted-foreground">Encrypt text using a public key.</p>
            </div>
          </div>
          <RsaEncryptPanel />
        </section>

        <section className="glass rounded-3xl p-6 md:p-8 space-y-8 h-fit">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-secondary rounded-lg">
              <Unlock className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">3. Decrypt</h2>
              <p className="text-xs text-muted-foreground">Decrypt text using a private key.</p>
            </div>
          </div>
          <RsaDecryptPanel />
        </section>
      </div>
    </div>
  );
}
