import { describe, expect, it } from 'vitest';
import {
  blogPosts,
  getNativeBlogPosts,
  getHomepageBlogPosts,
  getPostByHref,
  getPublishedPosts,
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

  it('returns only native posts from getPublishedPosts', () => {
    const now = new Date('2026-06-25T12:00:00+05:30');
    const published = getPublishedPosts(now);

    expect(published.length).toBeGreaterThan(0);
    expect(published.every((post) => post.native === true)).toBe(true);
    expect(published.every((post) => post.href.startsWith('/blog/'))).toBe(true);
  });

  it('returns at most three posts for the homepage', () => {
    const now = new Date('2026-06-25T12:00:00+05:30');
    const homepage = getHomepageBlogPosts(3, now);
    const published = getPublishedPosts(now);

    expect(homepage).toHaveLength(3);
    expect(homepage).toEqual(published.slice(0, 3));
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
