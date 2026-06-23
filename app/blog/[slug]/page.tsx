import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticle from '@/components/BlogArticle';
import { getMarkdownPost, getMarkdownSlugs } from '@/lib/blog';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getMarkdownSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getMarkdownPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Cipherly Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://cipherlyapp.com/blog/${post.slug}`,
    },
    alternates: {
      canonical: `https://cipherlyapp.com/blog/${post.slug}`,
    },
  };
}

export default async function MarkdownBlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getMarkdownPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}
