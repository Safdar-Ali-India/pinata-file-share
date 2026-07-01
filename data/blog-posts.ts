import {
  formatDisplayMonthYear,
  getPublishInstant,
  isPublished,
  publishedAtDateOnly,
  scheduleSlotAt0900Ist,
  sortByPublishedDesc,
  toOpenGraphPublishedTime,
} from '@/lib/blog-schedule';

export interface BlogPost {
  title: string;
  href: string;
  excerpt: string;
  date: string;
  publishedAt: string;
  native?: boolean;
  keywords?: string[];
}

export interface BlogPostWithSeo extends BlogPost {
  seoDatePublished: string;
  seoPublishedTime: string;
}

export const NATIVE_BLOG_SLUGS = [
  'temporary-file-sharing-without-an-account',
  'secure-expiring-file-links-droplink',
  'how-droplink-uses-pinata-ipfs-turso',
  'build-temporary-file-sharing-nextjs-pinata',
  'why-self-destructing-file-links-matter',
] as const;

export type NativeBlogSlug = (typeof NATIVE_BLOG_SLUGS)[number];

/** Posts already live — reschedule script must never overwrite these publishedAt values. */
export const SKIP_HREFS = new Set<string>([
  '/blog/temporary-file-sharing-without-an-account',
  '/blog/secure-expiring-file-links-droplink',
  '/blog/how-droplink-uses-pinata-ipfs-turso',
]);

export const blogPosts: BlogPost[] = [
  {
    title: 'Temporary File Sharing Without an Account: Why DropLink Exists',
    href: '/blog/temporary-file-sharing-without-an-account',
    excerpt:
      'Send a file in seconds without sign-ups, dashboards, or storage clutter. Learn how expiring links keep sharing fast, simple, and safer.',
    date: 'Jun 2026',
    publishedAt: '2026-06-01',
    native: true,
    keywords: ['temporary file sharing', 'no account file upload', 'expiring file links', 'DropLink'],
  },
  {
    title: 'Secure Expiring File Links: A Practical Guide for Everyday Sharing',
    href: '/blog/secure-expiring-file-links-droplink',
    excerpt:
      'Passwords and permanent links create long-term risk. See why time-limited URLs are the simplest upgrade for personal and team file sharing.',
    date: 'Jun 2026',
    publishedAt: '2026-06-08',
    native: true,
    keywords: ['secure file sharing', 'expiring links', 'temporary download links', 'file privacy'],
  },
  {
    title: 'How DropLink Uses Pinata IPFS and Turso for Reliable Temporary Storage',
    href: '/blog/how-droplink-uses-pinata-ipfs-turso',
    excerpt:
      'A behind-the-scenes look at the DropLink stack: Next.js on Vercel, Pinata for IPFS uploads, Turso for metadata, and automatic cleanup.',
    date: 'Jun 2026',
    publishedAt: '2026-06-15',
    native: true,
    keywords: ['Pinata IPFS', 'Turso', 'Next.js file upload', 'temporary file storage'],
  },
  {
    title: 'Build Temporary File Sharing with Next.js 14 and Pinata (Full Guide)',
    href: '/blog/build-temporary-file-sharing-nextjs-pinata',
    excerpt:
      'Step-by-step architecture for a production-ready upload flow with scheduled expiration, rate limits, and SEO-friendly share pages.',
    date: formatDisplayMonthYear(scheduleSlotAt0900Ist(8)),
    publishedAt: scheduleSlotAt0900Ist(8),
    native: true,
    keywords: ['Next.js file upload', 'Pinata tutorial', 'IPFS upload API', 'Vercel deployment'],
  },
  {
    title: 'Why Self-Destructing File Links Matter for Privacy in 2026',
    href: '/blog/why-self-destructing-file-links-matter',
    excerpt:
      'Permanent upload links leak data over time. Self-destructing file URLs reduce exposure, simplify compliance, and match how people actually share.',
    date: formatDisplayMonthYear(scheduleSlotAt0900Ist(9)),
    publishedAt: scheduleSlotAt0900Ist(9),
    native: true,
    keywords: ['self destructing file links', 'file privacy', 'temporary URLs', 'data minimization'],
  },
];

function withSeoFields(post: BlogPost): BlogPostWithSeo {
  return {
    ...post,
    seoDatePublished: publishedAtDateOnly(post.publishedAt),
    seoPublishedTime: toOpenGraphPublishedTime(post.publishedAt),
  };
}

export function getPublishedPosts(now: Date = new Date()): BlogPost[] {
  return sortByPublishedDesc(blogPosts.filter((post) => isPublished(post.publishedAt, now)));
}

export function getHomepageBlogPosts(limit = 3, now: Date = new Date()): BlogPost[] {
  return getPublishedPosts(now).slice(0, limit);
}

export function getNativeBlogPosts(now: Date = new Date()): BlogPost[] {
  return getPublishedPosts(now).filter((post) => post.native === true);
}

export function getPostByHref(href: string): BlogPostWithSeo | undefined {
  const post = blogPosts.find((entry) => entry.href === href);
  return post ? withSeoFields(post) : undefined;
}

export function getNativeSlugFromHref(href: string): NativeBlogSlug | undefined {
  if (!href.startsWith('/blog/')) return undefined;
  const slug = href.slice('/blog/'.length);
  return NATIVE_BLOG_SLUGS.includes(slug as NativeBlogSlug) ? (slug as NativeBlogSlug) : undefined;
}

export function getPublishInstantForPost(post: BlogPost): number {
  return getPublishInstant(post.publishedAt);
}
