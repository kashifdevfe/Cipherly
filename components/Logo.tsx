'use client';

import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-foreground"
      >
        <g fill="currentColor">
          {/* 
             High-quality SVG reconstruction of the staggered hexagonal logo.
             The design consists of three vertical panels with staggered heights.
          */}
          
          {/* Left Panel - Staggered Down */}
          <path d="M15 32 L38 20 V80 L15 68 Z" opacity="0.8" />
          
          {/* Middle Panel - Higher Profile */}
          <path d="M41 12 H59 V88 H41 Z" />
          
          {/* Right Panel - Staggered Down */}
          <path d="M62 20 L85 32 V68 L62 80 Z" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
