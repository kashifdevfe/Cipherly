'use client';

import dynamic from 'next/dynamic';
import { Lock, Search } from 'lucide-react';

const BcryptGenerator = dynamic(() => import('./BcryptGenerator'), { ssr: false });
const BcryptVerifier = dynamic(() => import('./BcryptVerifier'), { ssr: false });
const AlgorithmComparisonTable = dynamic(() => import('./AlgorithmComparisonTable'), { ssr: false });

export default function BcryptToolWrapper() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <section className="glass rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Generate Hash</h2>
              <p className="text-xs text-muted-foreground">Create a secure bcrypt password hash.</p>
            </div>
          </div>
          <BcryptGenerator />
        </section>

        <section className="glass rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-secondary rounded-lg">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Verify Hash</h2>
              <p className="text-xs text-muted-foreground">Check if a password matches a bcrypt hash.</p>
            </div>
          </div>
          <BcryptVerifier />
        </section>
      </div>

      <div className="max-w-5xl mx-auto space-y-6 pt-12">
        <div className="flex items-center gap-3 justify-center">
          <h2 className="text-3xl font-bold">Hashing Algorithms Comparison</h2>
        </div>
        <AlgorithmComparisonTable />
      </div>
    </div>
  );
}
