import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { SharePageClient } from '@/components/SharePageClient';

interface SharePageProps {
  params: Promise<{ token: string }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;

  return (
    <AppShell mainClassName="tool-main mx-auto max-w-2xl px-4 py-8 sm:py-10">
      <Link href="/" className="back-link">
        Upload a file
      </Link>
      <header className="hero" style={{ marginBottom: '1.5rem' }}>
        <h1>Shared file</h1>
        <p className="subtitle">Download this file before the link expires.</p>
      </header>
      <SharePageClient token={token} />
    </AppShell>
  );
}
