import type { BlogPost } from '@data/blog-posts';

interface BlogSpotlightProps {
  posts: BlogPost[];
}

function platformLabel(post: BlogPost): string {
  if (post.platform === 'dev') return 'DEV';
  if (post.platform === 'medium') return 'Medium';
  return 'Article';
}

export function BlogSpotlight({ posts }: BlogSpotlightProps) {
  if (posts.length === 0) return null;

  return (
    <section className="blog-spotlight" aria-labelledby="blog-spotlight-heading">
      <div className="blog-spotlight-header">
        <h2 id="blog-spotlight-heading">From the blog</h2>
        <a href="/blog" className="blog-spotlight-all">
          View all →
        </a>
      </div>
      <div className="blog-spotlight-grid">
        {posts.map((post) => (
          <article key={post.href} className="blog-spotlight-card">
            <span className="blog-platform">{platformLabel(post)}</span>
            <h3>
              {post.platform ? (
                <a href={post.href} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              ) : (
                <a href={post.href}>{post.title}</a>
              )}
            </h3>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
