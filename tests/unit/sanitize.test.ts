import { describe, expect, it } from 'vitest';
import { sanitizeFileName, isValidCid, buildGatewayUrl } from '@/lib/security/sanitize';

describe('sanitizeFileName', () => {
  it('strips path traversal', () => {
    expect(sanitizeFileName('../../etc/passwd')).toBe('passwd');
  });

  it('replaces unsafe characters', () => {
    expect(sanitizeFileName('my<script>.pdf')).toBe('my_script_.pdf');
  });

  it('falls back for empty names', () => {
    expect(sanitizeFileName('///')).toBe('file');
  });
});

describe('cid validation', () => {
  it('accepts valid ipfs cids', () => {
    expect(isValidCid('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi')).toBe(true);
  });

  it('rejects malformed cids', () => {
    expect(isValidCid('not-a-cid')).toBe(false);
    expect(isValidCid('https://evil.com')).toBe(false);
  });

  it('builds safe gateway urls', () => {
    const cid = 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
    expect(buildGatewayUrl('gateway.mypinata.cloud', cid)).toBe(
      `https://gateway.mypinata.cloud/ipfs/${cid}`
    );
  });
});
