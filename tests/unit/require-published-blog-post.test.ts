import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const notFoundMock = vi.fn(() => {
  throw new Error('NOT_FOUND');
});

vi.mock('next/navigation', () => ({
  notFound: notFoundMock,
}));

describe('requirePublishedBlogPost', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-26T12:00:00+05:30'));
    notFoundMock.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls notFound for future native posts', async () => {
    const { requirePublishedBlogPost } = await import('@/lib/require-published-blog-post');

    expect(() =>
      requirePublishedBlogPost('/blog/build-temporary-file-sharing-nextjs-pinata')
    ).toThrow('NOT_FOUND');
    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it('returns published native posts with SEO fields', async () => {
    const { requirePublishedBlogPost } = await import('@/lib/require-published-blog-post');
    const post = requirePublishedBlogPost('/blog/temporary-file-sharing-without-an-account');

    expect(post.title).toContain('Temporary File Sharing');
    expect(post.seoDatePublished).toBe('2026-06-01');
    expect(notFoundMock).not.toHaveBeenCalled();
  });

  it('calls notFound for unknown href', async () => {
    const { requirePublishedBlogPost } = await import('@/lib/require-published-blog-post');

    expect(() => requirePublishedBlogPost('/blog/does-not-exist')).toThrow('NOT_FOUND');
  });
});
