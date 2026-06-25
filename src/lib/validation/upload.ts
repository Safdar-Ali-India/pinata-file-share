import { z } from 'zod';
import { EXPIRATION_PRESETS, MAX_UPLOAD_BYTES, ALLOWED_MIME_TYPES } from '@/lib/constants';
import { AppError } from '@/lib/errors';

const presetHours = EXPIRATION_PRESETS.map((p) => p.hours);

export const expirationHoursSchema = z
  .number()
  .refine((h) => presetHours.includes(h as (typeof presetHours)[number]), {
    message: 'Invalid expiration preset',
  });

export function parseExpirationHours(raw: FormDataEntryValue | null): number {
  const parsed = z.coerce.number().int().safeParse(raw);
  if (!parsed.success) {
    throw new AppError('Expiration hours are required', 400, 'INVALID_EXPIRATION');
  }
  const result = expirationHoursSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new AppError('Invalid expiration option', 400, 'INVALID_EXPIRATION');
  }
  return result.data;
}

export function validateUploadFile(file: File | null): File {
  if (!file || !(file instanceof File) || file.size === 0) {
    throw new AppError('A non-empty file is required', 400, 'FILE_REQUIRED');
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new AppError(
      `File exceeds maximum size of ${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))}MB`,
      413,
      'FILE_TOO_LARGE'
    );
  }

  const mime = file.type || 'application/octet-stream';
  if (!ALLOWED_MIME_TYPES.has(mime)) {
    throw new AppError('File type is not allowed', 415, 'FILE_TYPE_NOT_ALLOWED');
  }

  return file;
}
