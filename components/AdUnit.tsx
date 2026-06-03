'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  style?: React.CSSProperties;
}

export default function AdUnit({ slot, format = 'auto', responsive = true, style }: AdUnitProps) {
  const adLoadedRef = useRef(false);

  useEffect(() => {
    if (adLoadedRef.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adLoadedRef.current = true;
    } catch (err) {
      console.warn('AdSense error:', err);
    }
  }, []);

  return (
    <div className="my-8 flex flex-col items-center">
      <span className="text-[10px] uppercase text-muted-foreground mb-2 tracking-widest font-semibold">Advertisement</span>
      <div className="w-full max-w-4xl border border-border/50 rounded-lg bg-muted/10 p-2 flex justify-center">
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            ...style
          }}
          data-ad-client="ca-pub-9460915138481579"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive.toString()}
        ></ins>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}
