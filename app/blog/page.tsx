import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Cryptography & Web Security Blog | Cipherly',
  description:
    'Learn about AES encryption, RSA key pairs, JWT security best practices, and modern web cryptography with our expert guides.',
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogLanding() {
  const articles = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tight">Security & Cryptography Blog</h1>
          <p className="text-xl text-muted-foreground">
            Expert guides on keeping your data secure in the modern web.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {articles.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="glass rounded-[2rem] border border-border p-8 transition-all group-hover:border-primary/40">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-widest text-primary">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
                </div>
                <h2 className="mt-2 text-2xl font-bold transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-tighter text-primary">
                  Read Article
                  <span className="h-[2px] w-4 bg-primary transition-all group-hover:w-8" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
