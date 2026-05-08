import Link from 'next/link';
import { Lock, Key, Fingerprint, Eye, ArrowLeftRight, ShieldCheck } from 'lucide-react';

const tools = [
  {
    title: 'AES Encryption',
    href: '/tools/aes-encryption-decryption',
    icon: Lock,
  },
  {
    title: 'RSA Key Gen',
    href: '/tools/rsa-key-generator',
    icon: Key,
  },
  {
    title: 'JWT Debugger',
    href: '/tools/jwt-decoder-validator',
    icon: Eye,
  },
  {
    title: 'Hash Generator',
    href: '/tools/online-hash-generator',
    icon: Fingerprint,
  },
  {
    title: 'Bcrypt Tool',
    href: '/tools/bcrypt-hash-generator',
    icon: ShieldCheck,
  },
  {
    title: 'Base64 Tool',
    href: '/tools/base64-encode-decode',
    icon: ArrowLeftRight,
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-black text-primary">404</h1>
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist. Try one of our cryptography tools instead.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors group"
            >
              <tool.icon className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-sm font-semibold">{tool.title}</div>
            </Link>
          ))}
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}