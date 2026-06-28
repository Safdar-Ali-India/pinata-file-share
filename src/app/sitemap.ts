import type { MetadataRoute } from 'next';
import { getNativeBlogPosts } from '@data/blog-posts';
import { getSiteUrl } from '@/lib/site-url';

export const dynamic = 'force-dynamic';

export function buildSitemap(now: Date = new Date()): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = getNativeBlogPosts(now).map((post) => ({
    url: `${siteUrl}${post.href}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}
