'use client';

const comparison = [
  { algo: 'Bcrypt', recommended: 'Yes', gpuResistant: 'High', memoryHard: 'No', useCase: 'Passwords (Legacy & Modern)' },
  { algo: 'Argon2id', recommended: 'Best (OWASP)', gpuResistant: 'Highest', memoryHard: 'Yes', useCase: 'Passwords (Modern Standard)' },
  { algo: 'PBKDF2', recommended: 'FIPS-140', gpuResistant: 'Low', memoryHard: 'No', useCase: 'Encryption Key Derivation' },
  { algo: 'scrypt', recommended: 'Yes', gpuResistant: 'High', memoryHard: 'Yes', useCase: 'Cryptocurrency & Passwords' },
];

export default function AlgorithmComparisonTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-secondary/10">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-bold">Algorithm</th>
              <th className="px-6 py-4 font-bold">OWASP Recommended</th>
              <th className="px-6 py-4 font-bold">GPU Resistance</th>
              <th className="px-6 py-4 font-bold">Memory Hard</th>
              <th className="px-6 py-4 font-bold">Primary Use Case</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {comparison.map((row, i) => (
              <tr key={i} className="hover:bg-secondary/20 transition-colors">
                <td className="px-6 py-4 font-bold text-primary">{row.algo}</td>
                <td className="px-6 py-4">{row.recommended}</td>
                <td className="px-6 py-4 text-xs">
                  <span className={`px-2 py-0.5 rounded-full ${
                    row.gpuResistant === 'Highest' ? 'bg-green-500/10 text-green-500' :
                    row.gpuResistant === 'High' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {row.gpuResistant}
                  </span>
                </td>
                <td className="px-6 py-4">{row.memoryHard}</td>
                <td className="px-6 py-4 text-muted-foreground text-xs">{row.useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
