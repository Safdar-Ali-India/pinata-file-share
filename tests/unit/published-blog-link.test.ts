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

  it('returns external link for published DEV/Medium posts', () => {
    const state = getPublishedBlogLinkState(
      'https://dev.to/safdarali/build-expiring-file-sharing-with-nextjs-and-pinata',
      new Date('2026-06-20T12:00:00+05:30')
    );
    expect(state.kind).toBe('external');
  });
});
