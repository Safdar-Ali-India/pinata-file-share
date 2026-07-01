import { describe, expect, it } from 'vitest';
import { getPublishedBlogLinkState } from '@/lib/published-blog-link';

describe('PublishedBlogLink state', () => {
  it('returns unpublished for future native posts', () => {
    const state = getPublishedBlogLinkState(
      '/blog/build-temporary-file-sharing-nextjs-pinata',
      new Date('2026-06-26T12:00:00+05:30')
    );
    expect(state).toEqual({ kind: 'unpublished' });
  });

  it('returns internal link for published native posts', () => {
    const state = getPublishedBlogLinkState('/blog/secure-expiring-file-links-droplink');
    expect(state).toEqual({
      kind: 'internal',
      href: '/blog/secure-expiring-file-links-droplink',
    });
  });

  it('returns unpublished for unknown href', () => {
    const state = getPublishedBlogLinkState('/blog/does-not-exist');
    expect(state).toEqual({ kind: 'unpublished' });
  });
});
