import Link from 'next/link';
import { getPublishedBlogLinkState } from '@/lib/published-blog-link';

interface PublishedBlogLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function PublishedBlogLink({ href, className, children }: PublishedBlogLinkProps) {
  const state = getPublishedBlogLinkState(href);

  if (state.kind === 'unpublished') {
    return <span className={className}>{children}</span>;
  }

  if (state.kind === 'external') {
    return (
      <a href={state.href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={state.href} className={className}>
      {children}
    </Link>
  );
}
