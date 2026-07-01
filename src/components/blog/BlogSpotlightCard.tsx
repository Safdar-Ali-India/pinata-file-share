import Link from 'next/link';
import type { BlogPost } from '@data/blog-posts';

interface BlogSpotlightCardProps {
  post: BlogPost;
}

export function BlogSpotlightCard({ post }: BlogSpotlightCardProps) {
  return (
    <article className="blog-spotlight-card">
      <span className="blog-platform">Article</span>
      <h3>
        <Link href={post.href}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
    </article>
  );
}
