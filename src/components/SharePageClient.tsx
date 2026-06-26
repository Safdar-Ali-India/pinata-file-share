'use client';

import { useEffect, useState } from 'react';
import type { ShareFileResponse, ApiErrorResponse } from '@/types/api';

interface SharePageClientProps {
  token: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function SharePageClient({ token }: SharePageClientProps) {
  const [data, setData] = useState<ShareFileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(`/api/share/${token}`);
        const json = (await response.json()) as ShareFileResponse | ApiErrorResponse;

        if (!active) return;

        if (response.status === 404) {
          setError('This share link does not exist.');
          return;
        }

        if (response.status === 410 || (json as ShareFileResponse).expired) {
          setData(json as ShareFileResponse);
          return;
        }

        if (!response.ok) {
          const err = json as ApiErrorResponse;
          setError(err.error ?? 'Unable to load file');
          return;
        }

        setData(json as ShareFileResponse);
      } catch {
        if (active) setError('Network error. Try again.');
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [token]);

  if (loading) {
    return <div className="card">Loading file details…</div>;
  }

  if (error) {
    return <div className="card alert alert-error">{error}</div>;
  }

  if (!data) {
    return <div className="card alert alert-error">File unavailable.</div>;
  }

  return (
    <div className="card stack">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{data.fileName}</h2>
        <span className={`badge ${data.expired ? 'badge-expired' : 'badge-live'}`}>
          {data.expired ? 'Expired' : data.remaining}
        </span>
      </div>

      <div className="meta-grid">
        <div className="meta-row">
          <span>Type</span>
          <span>{data.mimeType}</span>
        </div>
        <div className="meta-row">
          <span>Size</span>
          <span>{formatBytes(data.sizeBytes)}</span>
        </div>
      </div>

      {data.expired ? (
        <div className="alert alert-error">This file has expired and is no longer accessible.</div>
      ) : (
        <a href={`/api/share/${token}/download`}>
          <button type="button">Download file</button>
        </a>
      )}
    </div>
  );
}
