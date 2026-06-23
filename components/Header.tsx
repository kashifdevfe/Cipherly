'use client';

import { useState, useEffect } from 'react';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Link from 'next/link';
import Logo from './Logo';

const navLinks = [
  { href: '/#tools', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo size={38} />
          <span className="text-2xl font-black tracking-tighter text-foreground">Cipherly</span>
        </Link>

        {mounted && (
          <div className="flex items-center gap-3 md:gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

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

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden p-2.5 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        )}
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
