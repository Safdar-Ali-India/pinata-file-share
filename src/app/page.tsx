import { AppShell } from '@/components/AppShell';
import { BlogSpotlight } from '@/components/blog/BlogSpotlight';
import { UploadForm } from '@/components/UploadForm';
import { BRAND } from '@/lib/constants';
import { getHomepageBlogPosts } from '@data/blog-posts';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const blogPosts = getHomepageBlogPosts(3);

  return (
    <AppShell mainClassName="tool-main mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <header className="hero">
        <h1>{BRAND.name}</h1>
        <p className="subtitle hidden sm:block">{BRAND.tagline}</p>
        <div className="feature-pills">
          <span className="feature-pill">No account needed</span>
          <span className="feature-pill">Auto-expires</span>
          <span className="feature-pill">Up to 50MB</span>
        </div>
      </header>

      <UploadForm />
      <BlogSpotlight posts={blogPosts} />
    </AppShell>
  );
}
