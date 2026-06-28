import type { Metadata } from 'next';
import { AppShell } from '@/components/AppShell';
import { BlogIndexJsonLd } from '@/components/blog/BlogJsonLd';
import { BlogPostList } from '@/components/blog/BlogPostList';
import { getNativeBlogPosts, getPostByHref, getPublishedPosts } from '@data/blog-posts';
import { getSiteUrl } from '@/lib/site-url';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog — DropLink | Temporary file sharing guides',
  description:
    'Guides on temporary file sharing, expiring links, Pinata IPFS, Next.js uploads, and privacy-first file transfer with DropLink.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'DropLink Blog — Temporary file sharing guides',
    description:
      'Learn how to share files safely with expiring links, no accounts, and modern Next.js + Pinata architecture.',
    type: 'website',
    url: '/blog',
  },
};

export default function BlogIndexPage() {
  const posts = getPublishedPosts();
  const nativePosts = getNativeBlogPosts()
    .map((post) => getPostByHref(post.href))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
  const siteUrl = getSiteUrl();

  return (
    <AppShell mainClassName="tool-main mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <BlogIndexJsonLd posts={nativePosts} siteUrl={siteUrl} />
      <header className="blog-index-header">
        <p className="blog-eyebrow">DropLink Blog</p>
        <h1>Temporary file sharing guides</h1>
        <p className="subtitle">
          Practical articles on expiring links, secure uploads, and the tech behind DropLink — updated on a
          Tue / Thu schedule (IST).
        </p>
      </header>
      <BlogPostList posts={posts} />
    </AppShell>
  );
}
