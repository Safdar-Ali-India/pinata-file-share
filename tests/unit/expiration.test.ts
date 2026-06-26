import { describe, expect, it } from 'vitest';
import { computeExpiresAt, isExpired, formatRemainingTime } from '@/lib/expiration';

describe('expiration', () => {
  it('computes future unix timestamp from hours', () => {
    const now = Math.floor(Date.now() / 1000);
    const expires = computeExpiresAt(24);
    expect(expires).toBeGreaterThan(now);
    expect(expires - now).toBeGreaterThanOrEqual(86400 - 2);
  });

  it('rejects non-positive hours', () => {
    expect(() => computeExpiresAt(0)).toThrow();
    expect(() => computeExpiresAt(-1)).toThrow();
  });

  it('detects expired timestamps', () => {
    const past = Math.floor(Date.now() / 1000) - 10;
    expect(isExpired(past)).toBe(true);
  });

  it('formats remaining time', () => {
    const future = Math.floor(Date.now() / 1000) + 3700;
    expect(formatRemainingTime(future)).toMatch(/h|m/);
    expect(formatRemainingTime(Math.floor(Date.now() / 1000) - 1)).toBe('Expired');
  });
});
