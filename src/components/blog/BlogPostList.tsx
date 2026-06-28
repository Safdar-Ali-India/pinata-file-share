import type { BlogPost } from '@data/blog-posts';

interface BlogPostListProps {
  posts: BlogPost[];
}

function platformLabel(post: BlogPost): string | null {
  if (post.platform === 'dev') return 'DEV Community';
  if (post.platform === 'medium') return 'Medium';
  if (post.native) return 'DropLink';
  return null;
}

export function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) {
    return <p className="blog-empty">Published articles will appear here soon.</p>;
  }

  return (
    <ul className="blog-list">
      {posts.map((post) => {
        const label = platformLabel(post);
        const isExternal = Boolean(post.platform);

        return (
          <li key={post.href} className="blog-list-item">
            <article className="blog-card">
              <div className="blog-card-meta">
                {label && <span className="blog-platform">{label}</span>}
                <time dateTime={post.publishedAt}>{post.date}</time>
              </div>
              <h2 className="blog-card-title">
                {isExternal ? (
                  <a href={post.href} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                ) : (
                  <a href={post.href}>{post.title}</a>
                )}
              </h2>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              {isExternal ? (
                <a
                  href={post.href}
                  className="blog-read-more"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read on {post.platform === 'dev' ? 'DEV' : 'Medium'} →
                </a>
              ) : (
                <a href={post.href} className="blog-read-more">
                  Read article →
                </a>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
