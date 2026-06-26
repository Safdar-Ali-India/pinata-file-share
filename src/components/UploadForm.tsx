'use client';

import { useState } from 'react';
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

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!file) {
      setError('Choose a file to upload');
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
        throw new Error(err.error ?? 'Upload failed');
      }

      setResult(data as UploadSuccessResponse);
      setFile(null);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stack">
      <form className="card stack" onSubmit={onSubmit}>
        <div className="stack">
          <label htmlFor="file">Select file</label>
          <input
            id="file"
            name="file"
            type="file"
            disabled={loading}
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </div>

        <ExpirationPicker value={expirationHours} onChange={setExpirationHours} disabled={loading} />

        {error && (
          <div className="alert alert-error" role="alert">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading || !file}>
          {loading ? 'Uploading…' : 'Upload & get share link'}
        </button>
      </form>

      {result && <SharePanel result={result} />}
    </div>
  );
}
