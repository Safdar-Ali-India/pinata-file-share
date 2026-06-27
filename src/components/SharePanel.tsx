'use client';

import { useState } from 'react';
import type { UploadSuccessResponse } from '@/types/api';

interface SharePanelProps {
  result: UploadSuccessResponse;
  onReset: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function isImage(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

export function SharePanel({ result, onReset }: SharePanelProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(result.ipfsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="card card-success stack" aria-live="polite">
        <div className="panel-header">
          <h2 className="panel-title">Your link is ready</h2>
        </div>

        <div className="alert alert-success">Copy the link below and share it before it expires.</div>

        {isImage(result.mimeType) && (
          <div className="preview-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.ipfsUrl} alt={result.fileName} className="preview-image" />
          </div>
        )}

        <div className="link-block">
          <span className="field-label">Share link</span>
          <div className="share-link">{result.ipfsUrl}</div>
          <div className="action-row">
            <button type="button" className="btn-primary" onClick={copyLink}>
              {copied ? 'Copied' : 'Copy link'}
            </button>
            <a href={result.ipfsUrl} target="_blank" rel="noopener noreferrer" className="btn-link">
              Open link
            </a>
          </div>
        </div>

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

        <button type="button" className="btn-ghost" onClick={onReset}>
          Upload another file
        </button>
      </div>

      <div className={`toast ${copied ? 'toast-visible' : ''}`} role="status" aria-live="polite">
        Link copied to clipboard
      </div>
    </>
  );
}
