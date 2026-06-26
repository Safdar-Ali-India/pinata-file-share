import { UploadForm } from '@/components/UploadForm';

export default function HomePage() {
  return (
    <main>
      <h1>Pinata File Share</h1>
      <p className="subtitle">
        Upload files to IPFS via Pinata. Set an expiration — files auto-delete when the link expires.
      </p>
      <UploadForm />
      <footer>Files are stored on Pinata IPFS. Links stop working after expiration.</footer>
    </main>
  );
}
