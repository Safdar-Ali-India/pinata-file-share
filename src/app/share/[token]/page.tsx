import Link from 'next/link';
import { SharePageClient } from '@/components/SharePageClient';

interface SharePageProps {
  params: Promise<{ token: string }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;

  return (
    <main>
      <p style={{ marginBottom: '1rem' }}>
        <Link href="/">← Upload another file</Link>
      </p>
      <h1>Shared file</h1>
      <p className="subtitle">Download before the link expires.</p>
      <SharePageClient token={token} />
    </main>
  );
}
