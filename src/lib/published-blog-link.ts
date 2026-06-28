import { getPostByHref } from '@data/blog-posts';
import { isPublished } from '@/lib/blog-schedule';

export type PublishedBlogLinkState =
  | { kind: 'internal'; href: string }
  | { kind: 'external'; href: string }
  | { kind: 'unpublished' };

export function getPublishedBlogLinkState(href: string, now: Date = new Date()): PublishedBlogLinkState {
  const post = getPostByHref(href);

  if (!post || !isPublished(post.publishedAt, now)) {
    return { kind: 'unpublished' };
  }

  if (post.native) {
    return { kind: 'internal', href: post.href };
  }

  return { kind: 'external', href: post.href };
}
