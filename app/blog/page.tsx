import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Cryptography & Web Security Blog | Cipherly",
  description: "Learn about AES encryption, RSA key pairs, JWT security best practices, and modern web cryptography with our expert guides.",
};

export default function BlogLanding() {
  const articles = [
    { title: "How to Use AES Encryption for Beginners: Step-by-Step Guide", slug: "how-to-use-aes-encryption-for-beginners", cat: "Tutorial" },
    { title: "How AES-256 Encryption Works: A Plain English Guide", slug: "aes-256-encryption-works-guide", cat: "Informational" },
    { title: "AES vs RSA: Which Encryption Algorithm Should You Choose?", slug: "aes-vs-rsa-comparison", cat: "Comparison" },
    { title: "The Ultimate Guide to RSA Key Pairs for Beginners", slug: "rsa-key-pairs-beginners-guide", cat: "Informational" },
    { title: "JWT Security Best Practices: Avoiding Common Mistakes", slug: "common-jwt-vulnerabilities", cat: "Security" },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tight">Security & Cryptography Blog</h1>
          <p className="text-muted-foreground text-xl">Expert guides on keeping your data secure in the modern web.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {articles.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="glass p-8 rounded-[2rem] border border-border group-hover:border-primary/40 transition-all">
                <span className="text-xs font-black uppercase text-primary tracking-widest">{post.cat}</span>
                <h2 className="text-2xl font-bold mt-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <div className="mt-4 text-primary text-xs font-black uppercase tracking-tighter flex items-center gap-2">
                  Read Article
                  <span className="w-4 h-[2px] bg-primary group-hover:w-8 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
