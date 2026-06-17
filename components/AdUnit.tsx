'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  style?: React.CSSProperties;
}

export default function AdUnit({ slot, format = 'auto', responsive = true, style }: AdUnitProps) {
  useEffect(() => {
    try {
      // Check if there are any unfilled ads before pushing
      const unfilledAds = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status="done"])');
      if (unfilledAds.length > 0) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err: any) {
      if (!err.message?.includes('already have ads')) {
        console.warn('AdSense error:', err);
      }
    }
  }, [slot]);

  return (
    <div className="my-8 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-4xl flex justify-center min-h-[100px]">
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            width: '100%',
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
