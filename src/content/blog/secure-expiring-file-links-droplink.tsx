import { BlogSection } from '@/components/blog/BlogArticleLayout';

export function SecureExpiringLinksArticle() {
  return (
    <>
      <BlogSection
        paragraphs={[
          'Permanent download links are convenient — until they are not. A URL copied into a chat thread, forwarded in email, or saved in a notes app can outlive its purpose by years.',
          'Secure expiring file links fix that by design. Access ends at a known time, which shrinks your exposure window and makes accidental long-term leaks less likely.',
        ]}
      />
      <BlogSection
        title="The hidden cost of permanent links"
        paragraphs={[
          'Every permanent link is a small liability. Files stay reachable after contracts end, teammates leave, or devices change hands.',
          'Password-protected links help, but passwords also spread. Expiration adds a time boundary that passwords alone cannot provide.',
          'For personal sharing, expiration is often the highest-impact privacy upgrade with the lowest effort.',
        ]}
      />
      <BlogSection
        title="What makes an expiring link secure in practice"
        paragraphs={[
          'Strong expiring links combine four properties: unpredictable URLs, server-enforced expiry, limited file types, and automatic deletion at the storage layer.',
          'DropLink implements all four. Share tokens are opaque, expiration is stored at upload time, uploads pass validation checks, and Pinata deletes files when expires_at is reached.',
          'That means expiry is not cosmetic. The file is removed from storage — not just hidden in a UI.',
        ]}
      />
      <BlogSection
        title="Choosing the right expiration window"
        paragraphs={[
          'One hour works for quick handoffs in active conversations. Twenty-four hours suits most business attachments. Seven to thirty days fit async reviews where recipients may delay downloads.',
          'Shorter windows reduce risk. Longer windows reduce support friction. DropLink presets make that trade-off explicit at upload time.',
          'If a recipient misses the window, re-uploading is usually cheaper than maintaining a permanent public archive of every file you ever shared.',
        ]}
      />
      <BlogSection
        title="Expiring links for teams and creators"
        paragraphs={[
          'Agencies can send client deliverables with a seven-day window, nudging final downloads without maintaining a permanent portal.',
          'Creators can distribute press kits or preview assets that should not circulate indefinitely after launch week.',
          'Developers can share logs or build artifacts during incident response, knowing links die automatically once the issue closes.',
        ]}
      />
      <BlogSection
        title="Start sharing with a time limit"
        paragraphs={[
          'DropLink was built around one idea: sharing should be fast today and gone tomorrow. Expiring links are the mechanism that makes that promise real.',
          'Upload a file, pick your window, and send the link. When time is up, access stops — no account cleanup, no forgotten folders, no lingering exposure.',
        ]}
      />
    </>
  );
}
