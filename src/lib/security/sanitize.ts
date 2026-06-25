const UNSAFE_CHARS = /[^a-zA-Z0-9._-]/g;

export function sanitizeFileName(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? 'file';
  const cleaned = base.replace(UNSAFE_CHARS, '_').replace(/\.{2,}/g, '.').trim();
  const limited = cleaned.slice(0, 200);
  return limited.length > 0 ? limited : 'file';
}

export function isValidCid(cid: string): boolean {
  return /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|baf[a-z2-7]{56,})$/.test(cid);
}

export function buildGatewayUrl(gateway: string, cid: string): string {
  const host = gateway.replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!isValidCid(cid)) {
    throw new Error('Invalid CID');
  }
  return `https://${host}/ipfs/${cid}`;
}
