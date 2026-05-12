'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeftRight, ShieldCheck, FileCode } from 'lucide-react';

const Base64Panel = dynamic(() => import('./Base64Panel'), { ssr: false });
const HmacPanel = dynamic(() => import('./HmacPanel'), { ssr: false });
const FileToBase64 = dynamic(() => import('./FileToBase64'), { ssr: false });

const tabs = [
  { id: 'base64', label: 'Base64 Text', icon: ArrowLeftRight },
  { id: 'file', label: 'File to Base64', icon: FileCode },
  { id: 'hmac', label: 'HMAC Generator', icon: ShieldCheck },
];

export default function Base64HmacWrapper({ defaultTab = 'base64' }: { defaultTab?: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-center">
        <div className="flex p-1 bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20" />
              )}
              <tab.icon className={`relative z-10 w-4 h-4 ${activeTab === tab.id ? 'text-white' : ''}`} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 min-h-[400px]">
        {activeTab === 'base64' && <Base64Panel />}
        {activeTab === 'file' && <FileToBase64 />}
        {activeTab === 'hmac' && <HmacPanel />}
      </div>
    </div>
  );
}
