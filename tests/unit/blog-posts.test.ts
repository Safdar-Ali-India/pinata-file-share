import { describe, expect, it } from 'vitest';
import {
  blogPosts,
  getNativeBlogPosts,
  getPostByHref,
  getPublishedPosts,
  getSpotlightPosts,
  NATIVE_BLOG_SLUGS,
} from '@data/blog-posts';
import { blogArticleContent } from '@/content/blog';
import { isPublished } from '@/lib/blog-schedule';

describe('blog-posts accessors', () => {
  it('excludes future native posts from getPublishedPosts', () => {
    const futureNow = new Date('2026-06-01T00:00:00+05:30');
    const published = getPublishedPosts(futureNow);
    const nativeHrefs = published.filter((post) => post.native).map((post) => post.href);

    expect(nativeHrefs).not.toContain('/blog/build-temporary-file-sharing-nextjs-pinata');
    expect(nativeHrefs).not.toContain('/blog/why-self-destructing-file-links-matter');
  });

  it('includes live native posts for the current schedule window', () => {
    const now = new Date('2026-06-20T12:00:00+05:30');
    const native = getNativeBlogPosts(now).map((post) => post.href);

    expect(native).toContain('/blog/temporary-file-sharing-without-an-account');
    expect(native).toContain('/blog/secure-expiring-file-links-droplink');
    expect(native).toContain('/blog/how-droplink-uses-pinata-ipfs-turso');
  });

  it('adds SEO fields in getPostByHref', () => {
    const post = getPostByHref('/blog/temporary-file-sharing-without-an-account');
    expect(post?.seoDatePublished).toBe('2026-06-01');
    expect(post?.seoPublishedTime).toBeTruthy();
  });

  it('returns spotlight with one native, one DEV, and one Medium post when published', () => {
    const now = new Date('2026-06-25T12:00:00+05:30');
    const spotlight = getSpotlightPosts(now);

    expect(spotlight).toHaveLength(3);
    expect(spotlight.some((post) => post.native)).toBe(true);
    expect(spotlight.some((post) => post.platform === 'dev')).toBe(true);
    expect(spotlight.some((post) => post.platform === 'medium')).toBe(true);
  });

  it('matches every native slug to article content', () => {
    for (const slug of NATIVE_BLOG_SLUGS) {
      expect(blogArticleContent[slug]).toBeTypeOf('function');
    }
  });

  it('keeps future posts in source data but unpublished by schedule', () => {
    const futurePost = blogPosts.find(
      (post) => post.href === '/blog/build-temporary-file-sharing-nextjs-pinata'
    );
    expect(futurePost).toBeDefined();
    expect(isPublished(futurePost!.publishedAt, new Date('2026-06-26T12:00:00+05:30'))).toBe(false);
  });
});
