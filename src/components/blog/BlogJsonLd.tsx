import type { BlogPostWithSeo } from '@data/blog-posts';

interface BlogJsonLdProps {
  posts: BlogPostWithSeo[];
  siteUrl: string;
}

export function BlogIndexJsonLd({ posts, siteUrl }: BlogJsonLdProps) {
  const itemListElement = posts.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${siteUrl}${post.href}`,
    name: post.title,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogArticleJsonLdProps {
  post: BlogPostWithSeo;
  siteUrl: string;
  description: string;
}

export function BlogArticleJsonLd({ post, siteUrl, description }: BlogArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.seoPublishedTime,
    dateModified: post.seoPublishedTime,
    mainEntityOfPage: `${siteUrl}${post.href}`,
    author: {
      '@type': 'Person',
      name: 'Safdar Ali',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DropLink',
    },
    keywords: post.keywords?.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
