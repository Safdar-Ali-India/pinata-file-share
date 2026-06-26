import { describe, expect, it } from 'vitest';
import { parseExpirationHours } from '@/lib/validation/upload';

describe('parseExpirationHours', () => {
  it('accepts valid preset values', () => {
    expect(parseExpirationHours('24')).toBe(24);
    expect(parseExpirationHours('1')).toBe(1);
  });

  it('rejects invalid presets', () => {
    expect(() => parseExpirationHours('99')).toThrow();
    expect(() => parseExpirationHours(null)).toThrow();
  });
});
