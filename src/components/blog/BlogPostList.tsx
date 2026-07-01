import Link from 'next/link';
import type { BlogPost } from '@data/blog-posts';

interface BlogPostListProps {
  posts: BlogPost[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) {
    return <p className="blog-empty">Published articles will appear here soon.</p>;
  }

  return (
    <ul className="blog-list">
      {posts.map((post) => (
        <li key={post.href} className="blog-list-item">
          <article className="blog-card">
            <div className="blog-card-meta">
              <span className="blog-platform">DropLink</span>
              <time dateTime={post.publishedAt}>{post.date}</time>
            </div>
            <h2 className="blog-card-title">
              <Link href={post.href}>{post.title}</Link>
            </h2>
            <p className="blog-card-excerpt">{post.excerpt}</p>
            <Link href={post.href} className="blog-read-more">
              Read article →
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
