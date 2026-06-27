'use client';

import { useCallback, useState } from 'react';
import { EXPIRATION_PRESETS } from '@/lib/constants';
import { ExpirationPicker } from '@/components/ExpirationPicker';
import { SharePanel } from '@/components/SharePanel';
import type { UploadSuccessResponse } from '@/types/api';
import type { ApiErrorResponse } from '@/types/api';

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [expirationHours, setExpirationHours] = useState<number>(EXPIRATION_PRESETS[2]?.hours ?? 24);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadSuccessResponse | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const pickFile = useCallback((next: File | null) => {
    setFile(next);
    setError(null);
  }, []);

  const resetUpload = () => {
    setResult(null);
    setFile(null);
    setError(null);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('expirationHours', String(expirationHours));

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as UploadSuccessResponse | ApiErrorResponse;

      if (!response.ok) {
        const err = data as ApiErrorResponse;
        throw new Error(err.error ?? 'Upload failed. Please try again.');
      }

      setResult(data as UploadSuccessResponse);
      setFile(null);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => setDragActive(false);

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) pickFile(dropped);
  };

  if (result) {
    return (
      <div className="content-stage fade-in">
        <SharePanel result={result} onReset={resetUpload} />
      </div>
    );
  }

  return (
    <div className="content-stage">
      <form className="card stack" onSubmit={onSubmit}>
        <div
          className={`dropzone ${dragActive ? 'dropzone-active' : ''} ${file ? 'dropzone-has-file' : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            id="file"
            name="file"
            type="file"
            disabled={loading}
            onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
          />
          {file ? (
            <>
              <span className="dropzone-icon" aria-hidden>
                ✓
              </span>
              <span className="dropzone-file">{file.name}</span>
              <span className="dropzone-hint">Click to choose a different file</span>
            </>
          ) : (
            <>
              <span className="dropzone-icon" aria-hidden>
                ↑
              </span>
              <span className="dropzone-title">Drop a file here or browse</span>
              <span className="dropzone-hint">Images, PDFs, documents, and archives up to 50MB</span>
            </>
          )}
        </div>

        <ExpirationPicker value={expirationHours} onChange={setExpirationHours} disabled={loading} />

        {error && (
          <div className="alert alert-error" role="alert">
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={loading || !file}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden />
              Uploading…
            </>
          ) : (
            'Upload and get link'
          )}
        </button>
      </form>
    </div>
  );
}
