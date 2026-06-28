import Link from 'next/link';
import type { BlogPostWithSeo } from '@data/blog-posts';
import { PublishedBlogLink } from '@/components/blog/PublishedBlogLink';

interface BlogArticleLayoutProps {
  post: BlogPostWithSeo;
  children: React.ReactNode;
}

export function BlogArticleLayout({ post, children }: BlogArticleLayoutProps) {
  return (
    <article className="blog-article">
      <header className="blog-article-header">
        <Link href="/blog" className="blog-back-link">
          ← Back to blog
        </Link>
        <p className="blog-article-meta">
          <span className="blog-platform">DropLink</span>
          <time dateTime={post.seoDatePublished}>{post.date}</time>
        </p>
        <h1>{post.title}</h1>
        <p className="blog-article-excerpt">{post.excerpt}</p>
      </header>
      <div className="blog-article-body">{children}</div>
      <footer className="blog-article-footer">
        <p>
          Ready to share a file?{' '}
          <Link href="/" className="blog-inline-cta">
            Try DropLink free
          </Link>
          {' — no account required.'}
        </p>
        <p>
          Related:{' '}
          <PublishedBlogLink href="/blog/secure-expiring-file-links-droplink">
            secure expiring file links
          </PublishedBlogLink>
          {' · '}
          <PublishedBlogLink href="/blog/how-droplink-uses-pinata-ipfs-turso">
            Pinata + Turso architecture
          </PublishedBlogLink>
        </p>
      </footer>
    </article>
  );
}

interface BlogSectionProps {
  title?: string;
  paragraphs: string[];
}

export function BlogSection({ title, paragraphs }: BlogSectionProps) {
  return (
    <section className="blog-section">
      {title && <h2>{title}</h2>}
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
    </section>
  );
}
