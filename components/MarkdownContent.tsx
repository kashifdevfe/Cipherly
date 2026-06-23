import Link from 'next/link';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-foreground mt-10 first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-foreground mt-8">{children}</h3>
  ),
  p: ({ children }) => <p className="leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 ml-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 ml-4">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
  code: ({ children }) => (
    <code className="rounded bg-secondary/50 px-1.5 py-0.5 text-sm font-mono text-foreground">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="overflow-x-auto rounded-xl border border-border bg-secondary/30 p-4 text-sm font-mono">
      {children}
    </pre>
  ),
  a: ({ href, children }) => {
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className="font-semibold text-primary hover:underline">
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary hover:underline"
      >
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
};

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
