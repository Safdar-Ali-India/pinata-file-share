export const BRAND = {
  name: 'DropLink',
  tagline: 'Temporary file sharing with links that expire automatically.',
  author: 'Safdar Ali',
} as const;

export const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 52_428_800);

export const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'text/plain',
  'text/csv',
  'text/markdown',
  'application/json',
  'application/zip',
  'application/x-zip-compressed',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'audio/mpeg',
  'audio/wav',
  'video/mp4',
  'video/webm',
]);

export const EXPIRATION_PRESETS = [
  { label: '1 hour', hours: 1 },
  { label: '6 hours', hours: 6 },
  { label: '24 hours', hours: 24 },
  { label: '7 days', hours: 24 * 7 },
  { label: '30 days', hours: 24 * 30 },
] as const;

export const MAX_EXPIRATION_HOURS = 24 * 90;

export const RATE_LIMIT_UPLOADS_PER_HOUR = 20;

export const SHARE_TOKEN_LENGTH = 21;

export const CID_PATTERN = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|baf[a-z2-7]{56,})$/;
