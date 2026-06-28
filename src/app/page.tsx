import { AppShell } from '@/components/AppShell';
import { BlogSpotlight } from '@/components/blog/BlogSpotlight';
import { UploadForm } from '@/components/UploadForm';
import { BRAND } from '@/lib/constants';
import { getSpotlightPosts } from '@data/blog-posts';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const spotlightPosts = getSpotlightPosts();

  return (
    <AppShell>
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
      <BlogSpotlight posts={spotlightPosts} />
    </AppShell>
  );
}
