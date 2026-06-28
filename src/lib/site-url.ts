export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, '');
  if (configured) return configured;
  return 'https://pinata-file-share.vercel.app';
}
