import type { ReactElement } from 'react';
import type { NativeBlogSlug } from '@data/blog-posts';
import { TemporaryFileSharingArticle } from '@/content/blog/temporary-file-sharing-without-an-account';
import { SecureExpiringLinksArticle } from '@/content/blog/secure-expiring-file-links-droplink';
import { PinataTursoArchitectureArticle } from '@/content/blog/how-droplink-uses-pinata-ipfs-turso';
import { BuildNextJsPinataArticle } from '@/content/blog/build-temporary-file-sharing-nextjs-pinata';
import { SelfDestructingLinksArticle } from '@/content/blog/why-self-destructing-file-links-matter';

export const blogArticleContent: Record<NativeBlogSlug, () => ReactElement> = {
  'temporary-file-sharing-without-an-account': TemporaryFileSharingArticle,
  'secure-expiring-file-links-droplink': SecureExpiringLinksArticle,
  'how-droplink-uses-pinata-ipfs-turso': PinataTursoArchitectureArticle,
  'build-temporary-file-sharing-nextjs-pinata': BuildNextJsPinataArticle,
  'why-self-destructing-file-links-matter': SelfDestructingLinksArticle,
};

export function getBlogArticleContent(slug: NativeBlogSlug): () => ReactElement {
  return blogArticleContent[slug];
}
