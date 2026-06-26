import { describe, expect, it, beforeEach } from 'vitest';
import { checkRateLimit, resetRateLimits } from '@/lib/security/rate-limit';

describe('rate limit', () => {
  beforeEach(() => {
    resetRateLimits();
  });

  it('allows requests under the limit', () => {
    expect(() => checkRateLimit('test-ip', 3)).not.toThrow();
    expect(() => checkRateLimit('test-ip', 3)).not.toThrow();
    expect(() => checkRateLimit('test-ip', 3)).not.toThrow();
  });

  it('blocks when limit exceeded', () => {
    checkRateLimit('blocked-ip', 2);
    checkRateLimit('blocked-ip', 2);
    expect(() => checkRateLimit('blocked-ip', 2)).toThrow(/Rate limit/);
  });

  it('isolates keys', () => {
    checkRateLimit('a', 1);
    expect(() => checkRateLimit('b', 1)).not.toThrow();
  });
});
