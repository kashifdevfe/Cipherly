import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AuthorBio from '@/components/AuthorBio';
import MarkdownContent from '@/components/MarkdownContent';
import type { MarkdownPost } from '@/lib/blog';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

interface BlogArticleProps {
  post: MarkdownPost;
}

export default function BlogArticle({ post }: BlogArticleProps) {
  return (
    <article className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="space-y-12">
        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Blog
          </Link>
          <h1 className="text-5xl font-black tracking-tighter">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="font-bold">{post.author}</span>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {post.category}
            </span>
          </div>
        </div>

        <MarkdownContent content={post.content} />

        {post.toolLink && (
          <section className="mt-8 space-y-4 rounded-lg border border-primary/20 bg-primary/5 p-6">
            <h2 className="text-xl font-bold text-foreground">Try it yourself</h2>
            <p className="text-muted-foreground">
              Put what you learned into practice with Cipherly&apos;s free browser-based tool.
            </p>
            <Link
              href={post.toolLink}
              className="mt-4 inline-block rounded-lg bg-primary px-6 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {post.toolCta ?? 'Open Tool'}
            </Link>
          </section>
        )}

        <AuthorBio />
      </div>
    </article>
  );
}
