import Link from 'next/link';
import type { BlogPost } from '@data/blog-posts';
import { BlogSpotlightSlider } from '@/components/blog/BlogSpotlightSlider';

interface BlogSpotlightProps {
  posts: BlogPost[];
}

export function BlogSpotlight({ posts }: BlogSpotlightProps) {
  if (posts.length === 0) return null;

  return (
    <section className="blog-spotlight" aria-labelledby="blog-spotlight-heading">
      <div className="blog-spotlight-header">
        <div>
          <h2 id="blog-spotlight-heading">From the blog</h2>
          <p className="blog-spotlight-subtitle">Latest articles — swipe or use arrows for more</p>
        </div>
        <Link href="/blog" className="blog-spotlight-all">
          View all →
        </Link>
      </div>
      <BlogSpotlightSlider posts={posts} />
    </section>
  );
}
