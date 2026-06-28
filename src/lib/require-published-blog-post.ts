import { notFound } from 'next/navigation';
import { getPostByHref, type BlogPostWithSeo } from '@data/blog-posts';
import { isPublished } from '@/lib/blog-schedule';

export function requirePublishedBlogPost(href: string): BlogPostWithSeo {
  const post = getPostByHref(href);

  if (!post || post.native !== true || !isPublished(post.publishedAt)) {
    notFound();
  }

  return post;
}
