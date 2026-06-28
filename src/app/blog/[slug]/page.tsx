import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { BlogArticleJsonLd } from '@/components/blog/BlogJsonLd';
import { BlogArticleLayout } from '@/components/blog/BlogArticleLayout';
import { getBlogArticleContent } from '@/content/blog';
import {
  getNativeSlugFromHref,
  getPostByHref,
  NATIVE_BLOG_SLUGS,
  type NativeBlogSlug,
} from '@data/blog-posts';
import { isPublished } from '@/lib/blog-schedule';
import { requirePublishedBlogPost } from '@/lib/require-published-blog-post';
import { getSiteUrl } from '@/lib/site-url';

export const dynamic = 'force-dynamic';

interface BlogArticlePageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: BlogArticlePageProps): Metadata {
  const slug = params.slug;
  if (!NATIVE_BLOG_SLUGS.includes(slug as NativeBlogSlug)) {
    return {};
  }

  const href = `/blog/${slug}`;
  const post = getPostByHref(href);

  if (!post || post.native !== true || !isPublished(post.publishedAt)) {
    return {
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${post.title} — DropLink Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: href },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: href,
      publishedTime: post.seoPublishedTime,
    },
  };
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const slug = params.slug;
  if (!NATIVE_BLOG_SLUGS.includes(slug as NativeBlogSlug)) {
    notFound();
  }

  const href = `/blog/${slug}`;
  const post = requirePublishedBlogPost(href);
  const nativeSlug = getNativeSlugFromHref(href);

  if (!nativeSlug) {
    notFound();
  }

  const ArticleContent = getBlogArticleContent(nativeSlug);
  const siteUrl = getSiteUrl();

  return (
    <AppShell mainClassName="tool-main mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <BlogArticleJsonLd post={post} siteUrl={siteUrl} description={post.excerpt} />
      <BlogArticleLayout post={post}>
        <ArticleContent />
      </BlogArticleLayout>
    </AppShell>
  );
}
