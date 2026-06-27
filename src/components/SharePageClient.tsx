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

function isImage(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

export function SharePageClient({ token }: SharePageClientProps) {
  const [data, setData] = useState<ShareFileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(`/api/share/${token}`);
        const json = (await response.json()) as ShareFileResponse | ApiErrorResponse;

        if (!active) return;

        if (response.status === 404) {
          setError('This link is invalid or no longer available.');
          return;
        }

        if (response.status === 410 || (json as ShareFileResponse).expired) {
          setData(json as ShareFileResponse);
          return;
        }

        if (!response.ok) {
          const err = json as ApiErrorResponse;
          setError(err.error ?? 'Unable to load this file.');
          return;
        }

        setData(json as ShareFileResponse);
      } catch {
        if (active) setError('Unable to load this file. Please try again.');
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [token]);

  const copyLink = async () => {
    if (!data?.downloadUrl) return;
    await navigator.clipboard.writeText(data.downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="skeleton" aria-label="Loading file details" />
      </div>
    );
  }

  if (error) {
    return <div className="card alert alert-error">{error}</div>;
  }

  if (!data) {
    return <div className="card alert alert-error">This file is unavailable.</div>;
  }

  return (
    <>
      <div className="card stack fade-in">
        <div className="share-header">
          <h2>{data.fileName}</h2>
          <span className={`badge ${data.expired ? 'badge-expired' : 'badge-live'}`}>
            {data.expired ? 'Expired' : data.remaining}
          </span>
        </div>

        {!data.expired && isImage(data.mimeType) && data.downloadUrl && (
          <div className="preview-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.downloadUrl} alt={data.fileName} className="preview-image" />
          </div>
        )}

        <div className="meta-grid">
          <div className="meta-row">
            <span>Size</span>
            <span>{formatBytes(data.sizeBytes)}</span>
          </div>
        </div>

        {data.expired ? (
          <div className="alert alert-error">This file has expired and is no longer available.</div>
        ) : (
          <>
            <div className="link-block">
              <span className="field-label">Download link</span>
              <div className="share-link">{data.downloadUrl}</div>
            </div>
            <div className="action-row">
              <button type="button" className="btn-primary" onClick={copyLink}>
                {copied ? 'Copied' : 'Copy link'}
              </button>
              <a href={data.downloadUrl} target="_blank" rel="noopener noreferrer" className="btn-link">
                Open link
              </a>
              <a href={data.downloadUrl} download={data.fileName} className="btn-secondary">
                Download
              </a>
            </div>
          </>
        )}
      </div>

      <div className={`toast ${copied ? 'toast-visible' : ''}`} role="status" aria-live="polite">
        Link copied to clipboard
      </div>
    </>
  );
}
