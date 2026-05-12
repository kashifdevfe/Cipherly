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
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-4xl">
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
