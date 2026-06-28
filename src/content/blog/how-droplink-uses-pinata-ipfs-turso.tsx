import { BlogSection } from '@/components/blog/BlogArticleLayout';
import { PublishedBlogLink } from '@/components/blog/PublishedBlogLink';

export function PinataTursoArchitectureArticle() {
  return (
    <>
      <BlogSection
        paragraphs={[
          'DropLink looks simple on the surface: upload, share, expire. Under the hood it combines Next.js, Pinata IPFS, and Turso to deliver reliable temporary storage without running your own file cluster.',
          'This article explains how those pieces fit together and why the architecture scales on Vercel’s serverless model.',
        ]}
      />
      <BlogSection
        title="Upload flow in one request"
        paragraphs={[
          'When you upload, the browser sends multipart form data to POST /api/upload. The API validates the file, uploads it to Pinata’s v3 endpoint with an expires_at timestamp, then writes metadata to the database.',
          'The response includes a share URL and optional direct IPFS gateway link. All Pinata credentials stay on the server — the client never sees your JWT.',
        ]}
      />
      <BlogSection
        title="Why Pinata IPFS for file bytes"
        paragraphs={[
          'Pinata handles IPFS pinning, gateway delivery, and scheduled deletion. DropLink sets expires_at in ISO 8601 IST-aligned timestamps so files are removed automatically.',
          'Using IPFS gateways gives fast downloads without exposing internal infrastructure. Dedicated gateways also improve branding and cache behavior compared with public gateways alone.',
        ]}
      />
      <BlogSection
        title="Why Turso for metadata"
        paragraphs={[
          'Files live on Pinata; metadata lives in Turso (libSQL). Each record stores the share token, Pinata CID, filename, MIME type, size, and expiration epoch.',
          'Turso fits serverless deployments: low latency, edge-friendly auth tokens, and SQL semantics via Drizzle ORM. Local development uses SQLite with the same schema.',
        ]}
      />
      <BlogSection
        title="Cleanup and health checks"
        paragraphs={[
          'Pinata deletes expired file bytes on schedule. DropLink runs a daily cron job to mark expired records deleted in the database, keeping queries and share pages accurate.',
          'A health endpoint verifies database connectivity, Pinata JWT validity, and required environment variables — useful for production monitoring on Vercel.',
        ]}
      />
      <BlogSection
        title="Security layers"
        paragraphs={[
          'Rate limiting protects upload endpoints from abuse. Filename sanitization blocks path tricks. MIME allowlists reduce executable uploads. Middleware adds standard security headers.',
          'Errors shown to visitors are sanitized in production so configuration details never leak to the browser.',
        ]}
      />
      <BlogSection
        title="Stack summary"
        paragraphs={[
          'Frontend: Next.js 14 App Router, React, Tailwind CSS. Storage: Pinata IPFS. Database: Turso + Drizzle. Hosting: Vercel with dynamic API routes and daily cron cleanup.',
        ]}
      />
      <section className="blog-section">
        <p>
          Want the implementation walkthrough? Read the upcoming guide on{' '}
          <PublishedBlogLink href="/blog/build-temporary-file-sharing-nextjs-pinata">
            building temporary file sharing with Next.js and Pinata
          </PublishedBlogLink>
          .
        </p>
      </section>
    </>
  );
}
