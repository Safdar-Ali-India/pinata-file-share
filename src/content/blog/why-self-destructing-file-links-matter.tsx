import { BlogSection } from '@/components/blog/BlogArticleLayout';
import { PublishedBlogLink } from '@/components/blog/PublishedBlogLink';

export function SelfDestructingLinksArticle() {
  return (
    <>
      <BlogSection
        paragraphs={[
          'Self-destructing file links are URLs that stop working after a set time — and ideally delete the underlying file automatically. They are one of the simplest privacy upgrades you can add to everyday sharing.',
          'In 2026, with tighter data expectations and more cross-device messaging, temporary URLs are no longer a niche feature. They are baseline hygiene.',
        ]}
      />
      <BlogSection
        title="Data minimization for real people"
        paragraphs={[
          'Most users do not want a permanent archive of every file they ever sent. They want the recipient to get the document today.',
          'Self-destructing links align product behavior with that intent. Less data retained means less risk from breaches, link forwarding, and forgotten uploads.',
        ]}
      />
      <BlogSection
        title="Better than manual deletion"
        paragraphs={[
          'Manual cleanup fails because humans forget. Automatic expiration succeeds because it is enforced by storage infrastructure.',
          'DropLink sets expires_at at upload time on Pinata, so deletion is scheduled when the file lands — not when someone remembers to click delete.',
        ]}
      />
      <BlogSection
        title="Use cases that benefit immediately"
        paragraphs={[
          'HR and finance teams sharing payslips or tax forms. Lawyers sending drafts under time pressure. Support agents attaching logs during incidents. Parents sharing school forms with teachers.',
          'In each case, the file has a natural shelf life. Self-destructing links match that shelf life without extra tools.',
        ]}
      />
      <BlogSection
        title="How to adopt the habit"
        paragraphs={[
          'Default to shorter expirations and extend only when someone asks. Treat permanent links as the exception, not the default.',
          'Use a tool built for expiration rather than repurposing cloud folders that never close access automatically.',
        ]}
      />
      <section className="blog-section">
        <p>
          DropLink makes this workflow effortless. Learn how the stack works in{' '}
          <PublishedBlogLink href="/blog/how-droplink-uses-pinata-ipfs-turso">
            our Pinata + Turso architecture post
          </PublishedBlogLink>
          , or upload a file now from the homepage.
        </p>
      </section>
    </>
  );
}
