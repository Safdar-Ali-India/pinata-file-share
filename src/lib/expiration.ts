import { MAX_EXPIRATION_HOURS } from '@/lib/constants';
import { AppError } from '@/lib/errors';

export function computeExpiresAt(hours: number): number {
  if (!Number.isFinite(hours) || hours <= 0) {
    throw new AppError('Expiration must be a positive number of hours', 400, 'INVALID_EXPIRATION');
  }

  if (hours > MAX_EXPIRATION_HOURS) {
    throw new AppError(`Expiration cannot exceed ${MAX_EXPIRATION_HOURS} hours`, 400, 'EXPIRATION_TOO_LONG');
  }

  return Math.floor(Date.now() / 1000) + Math.floor(hours * 3600);
}

export function isExpired(expiresAtUnix: number): boolean {
  return expiresAtUnix <= Math.floor(Date.now() / 1000);
}

export function formatRemainingTime(expiresAtUnix: number): string {
  const secondsLeft = expiresAtUnix - Math.floor(Date.now() / 1000);
  if (secondsLeft <= 0) return 'Expired';

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}
