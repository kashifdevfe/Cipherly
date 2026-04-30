'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(0,255,156,0.2)]">
            <Image 
              src="/logo.png" 
              alt="Cipherly Logo" 
              fill 
              className="object-cover scale-110"
            />
          </div>
          <span className="text-2xl font-black tracking-tighter">Cipherly</span>
        </Link>


        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-primary" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </div>
    </header>
  );
}
