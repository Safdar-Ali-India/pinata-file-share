import { BlogSection } from '@/components/blog/BlogArticleLayout';
import { PublishedBlogLink } from '@/components/blog/PublishedBlogLink';

export function BuildNextJsPinataArticle() {
  return (
    <>
      <BlogSection
        paragraphs={[
          'This guide walks through building a production-grade temporary file-sharing app with Next.js 14 App Router and Pinata — the same architecture powering DropLink.',
          'You will cover upload APIs, scheduled expiration, metadata storage, and deployment patterns that work on Vercel without background workers.',
        ]}
      />
      <BlogSection
        title="Project structure"
        paragraphs={[
          'Use the App Router with route handlers under app/api/upload. Keep Pinata logic in lib/pinata, database access in lib/db with Drizzle, and validation in lib/validation with Zod.',
          'Separate share pages (app/share/[token]) from marketing/blog routes so upload traffic stays isolated from content pages.',
        ]}
      />
      <BlogSection
        title="Pinata v3 upload essentials"
        paragraphs={[
          'Pinata’s v3 files API accepts multipart uploads with network=public and expires_at as an ISO 8601 timestamp. Server-side JWT auth keeps secrets off the client.',
          'Always buffer uploaded files before forwarding to Pinata on serverless — incoming FormData File objects can behave inconsistently across runtimes.',
          'Grant Files → Write permission when creating Pinata API keys. Verify auth with testAuthentication in a health endpoint before debugging upload failures.',
        ]}
      />
      <BlogSection
        title="Metadata and share tokens"
        paragraphs={[
          'After Pinata returns a CID, insert a row with a short opaque share token, expiration epoch, MIME type, and file size. Never expose Pinata IDs directly in public URLs.',
          'Share pages fetch metadata by token, check expiration, and redirect downloads through your gateway domain for consistent branding and analytics.',
        ]}
      />
      <BlogSection
        title="Production checklist"
        paragraphs={[
          'Set PINATA_JWT, PINATA_GATEWAY, DATABASE_URL, DATABASE_AUTH_TOKEN (Turso), NEXT_PUBLIC_APP_URL, and CRON_SECRET on Vercel.',
          'Mark upload, blog, and sitemap routes as force-dynamic when content depends on scheduled publish times — future posts must not bake into static HTML at build time.',
          'Add rate limits, security headers, and sanitized error messages. Run Vitest for schedule utilities and publish guards.',
        ]}
      />
      <BlogSection
        title="SEO and content scheduling"
        paragraphs={[
          'If you add a blog, centralize posts in a data file with publishedAt timestamps in IST. Filter unpublished entries from sitemap, JSON-LD, and internal links.',
          'Use request-time isPublished checks so articles appear automatically when their slot arrives — no redeploy and no cron required for publishing.',
        ]}
      />
      <section className="blog-section">
        <p>
          New to expiring links? Start with{' '}
          <PublishedBlogLink href="/blog/temporary-file-sharing-without-an-account">
            temporary file sharing without an account
          </PublishedBlogLink>{' '}
          and{' '}
          <PublishedBlogLink href="/blog/secure-expiring-file-links-droplink">
            secure expiring file links
          </PublishedBlogLink>
          .
        </p>
      </section>
    </>
  );
}
