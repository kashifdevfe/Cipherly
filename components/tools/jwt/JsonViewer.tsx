'use client';

interface JsonViewerProps {
  data: any;
  label?: string;
}

export default function JsonViewer({ data, label }: JsonViewerProps) {
  const formatValue = (val: any) => {
    if (typeof val === 'string') return <span className="text-green-400">"{val}"</span>;
    if (typeof val === 'number') return <span className="text-yellow-400">{val}</span>;
    if (typeof val === 'boolean') return <span className="text-purple-400">{val.toString()}</span>;
    return val;
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-[10px] font-bold uppercase text-muted-foreground">{label}</label>}
      <pre className="w-full p-4 bg-[#0a0a0a] border border-border rounded-xl font-mono text-xs overflow-x-auto">
        <code>
          {JSON.stringify(data, null, 2).split('\n').map((line, i) => {
            const [key, ...rest] = line.split(':');
            if (rest.length === 0) return <div key={i}>{line}</div>;
            return (
              <div key={i}>
                <span className="text-blue-400">{key}</span>:
                {rest.join(':')}
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
