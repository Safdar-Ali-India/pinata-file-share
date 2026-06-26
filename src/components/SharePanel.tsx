'use client';

import type { UploadSuccessResponse } from '@/types/api';

interface SharePanelProps {
  result: UploadSuccessResponse;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleString();
}

export function SharePanel({ result }: SharePanelProps) {
  const copyLink = async () => {
    await navigator.clipboard.writeText(result.shareUrl);
  };

  return (
    <div className="card stack" aria-live="polite">
      <div className="alert alert-success">File uploaded. Share the link below before it expires.</div>

      <div className="meta-grid">
        <div className="meta-row">
          <span>File</span>
          <span>{result.fileName}</span>
        </div>
        <div className="meta-row">
          <span>Size</span>
          <span>{formatBytes(result.sizeBytes)}</span>
        </div>
        <div className="meta-row">
          <span>Expires</span>
          <span>{formatDate(result.expiresAt)}</span>
        </div>
      </div>

      <div className="share-link">{result.shareUrl}</div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button type="button" onClick={copyLink}>
          Copy link
        </button>
        <a href={result.shareUrl} style={{ alignSelf: 'center' }}>
          Open share page
        </a>
      </div>
    </div>
  );
}
