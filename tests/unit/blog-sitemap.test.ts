import { describe, expect, it } from 'vitest';
import { buildSitemap } from '@/app/sitemap';
import { getSiteUrl } from '@/lib/site-url';

describe('blog sitemap', () => {
  it('includes only published native blog URLs', () => {
    const now = new Date('2026-06-26T12:00:00+05:30');
    const siteUrl = getSiteUrl();
    const entries = buildSitemap(now);
    const blogUrls = entries
      .map((entry) => entry.url)
      .filter((url) => url.includes('/blog/'));

    expect(blogUrls).toContain(`${siteUrl}/blog/temporary-file-sharing-without-an-account`);
    expect(blogUrls).toContain(`${siteUrl}/blog/how-droplink-uses-pinata-ipfs-turso`);
    expect(blogUrls).not.toContain(`${siteUrl}/blog/build-temporary-file-sharing-nextjs-pinata`);
    expect(blogUrls).not.toContain(`${siteUrl}/blog/why-self-destructing-file-links-matter`);

    expect(entries.some((entry) => entry.url.endsWith('/blog'))).toBe(true);
  });
});
