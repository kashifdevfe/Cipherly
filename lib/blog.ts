import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content/blog');

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  toolLink?: string;
  toolCta?: string;
  source: 'legacy' | 'markdown';
};

export type MarkdownPost = BlogPostMeta & {
  content: string;
};

/** Existing articles built as React pages — listed here for the blog index and sitemap. */
export const legacyPosts: BlogPostMeta[] = [
  {
    slug: 'bcrypt-vs-argon2',
    title: 'Bcrypt vs Argon2: Which Password Hashing Algorithm is Better?',
    description: 'Compare Bcrypt and Argon2 for password hashing in modern web applications.',
    date: '2026-06-01',
    category: 'Comparison',
    author: 'Cipherly Team',
    source: 'legacy',
  },
  {
    slug: 'what-is-hmac-authentication',
    title: 'What is HMAC? Understanding Hash-Based Message Authentication',
    description: 'Learn how HMAC authentication works and why it matters for API security.',
    date: '2026-05-20',
    category: 'Security',
    author: 'Cipherly Team',
    source: 'legacy',
  },
  {
    slug: 'understanding-base64-encoding',
    title: 'Understanding Base64 Encoding: What It Is and Why We Use It',
    description: 'A clear guide to Base64 encoding, decoding, and common use cases.',
    date: '2026-05-18',
    category: 'Informational',
    author: 'Cipherly Team',
    source: 'legacy',
  },
  {
    slug: 'why-stop-using-md5',
    title: 'Why You Need to Stop Using MD5 Immediately',
    description: 'Why MD5 is broken for security and what to use instead.',
    date: '2026-05-15',
    category: 'Security',
    author: 'Cipherly Team',
    source: 'legacy',
  },
  {
    slug: 'how-to-use-aes-encryption-for-beginners',
    title: 'How to Use AES Encryption for Beginners: Step-by-Step Guide',
    description: 'A beginner-friendly walkthrough of AES encryption with Cipherly.',
    date: '2026-05-12',
    category: 'Tutorial',
    author: 'Cipherly Team',
    source: 'legacy',
  },
  {
    slug: 'aes-256-encryption-works-guide',
    title: 'How AES-256 Encryption Works: A Plain English Guide',
    description: 'Learn how AES-256 encryption works and why it is considered military-grade.',
    date: '2026-05-10',
    category: 'Informational',
    author: 'Cipherly Team',
    source: 'legacy',
  },
  {
    slug: 'aes-vs-rsa-comparison',
    title: 'AES vs RSA: Which Encryption Algorithm Should You Choose?',
    description: 'Compare symmetric and asymmetric encryption for real-world projects.',
    date: '2026-05-08',
    category: 'Comparison',
    author: 'Cipherly Team',
    source: 'legacy',
  },
  {
    slug: 'rsa-key-pairs-beginners-guide',
    title: 'The Ultimate Guide to RSA Key Pairs for Beginners',
    description: 'Everything you need to know about generating and using RSA key pairs.',
    date: '2026-05-06',
    category: 'Informational',
    author: 'Cipherly Team',
    source: 'legacy',
  },
  {
    slug: 'common-jwt-vulnerabilities',
    title: 'JWT Security Best Practices: Avoiding Common Mistakes',
    description: 'Common JWT vulnerabilities and how to avoid them in production.',
    date: '2026-05-04',
    category: 'Security',
    author: 'Cipherly Team',
    source: 'legacy',
  },
];

function parseMarkdownFile(filename: string): BlogPostMeta | null {
  if (!filename.endsWith('.md') || filename.startsWith('_')) {
    return null;
  }

  const slug = filename.replace(/\.md$/, '');
  const filePath = path.join(contentDir, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(raw);

  if (!data.title || !data.description || !data.date || !data.category) {
    return null;
  }

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: String(data.date),
    category: String(data.category),
    author: data.author ? String(data.author) : 'Cipherly Team',
    toolLink: data.toolLink ? String(data.toolLink) : undefined,
    toolCta: data.toolCta ? String(data.toolCta) : undefined,
    source: 'markdown',
  };
}

export function getMarkdownPosts(): BlogPostMeta[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs
    .readdirSync(contentDir)
    .map(parseMarkdownFile)
    .filter((post): post is BlogPostMeta => post !== null);
}

export function getAllPosts(): BlogPostMeta[] {
  return [...legacyPosts, ...getMarkdownPosts()].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getMarkdownPost(slug: string): MarkdownPost | null {
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const meta = parseMarkdownFile(`${slug}.md`);

  if (!meta) {
    return null;
  }

  return { ...meta, content };
}

export function getMarkdownSlugs(): string[] {
  return getMarkdownPosts().map((post) => post.slug);
}
