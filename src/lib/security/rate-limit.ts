import { RATE_LIMIT_UPLOADS_PER_HOUR } from '@/lib/constants';
import { AppError } from '@/lib/errors';

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60 * 60 * 1000;

export function checkRateLimit(key: string, limit = RATE_LIMIT_UPLOADS_PER_HOUR): void {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  if (bucket.count >= limit) {
    const retryAfterSec = Math.ceil((bucket.resetAt - now) / 1000);
    throw new AppError(`Rate limit exceeded. Try again in ${retryAfterSec}s.`, 429, 'RATE_LIMITED');
  }

  bucket.count += 1;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export function resetRateLimits(): void {
  buckets.clear();
}
