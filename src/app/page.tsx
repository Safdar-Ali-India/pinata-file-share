import { AppShell } from '@/components/AppShell';
import { UploadForm } from '@/components/UploadForm';
import { BRAND } from '@/lib/constants';

export default function HomePage() {
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
    </AppShell>
  );
}
