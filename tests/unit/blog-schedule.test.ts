import { describe, expect, it } from 'vitest';
import {
  getPublishInstant,
  isPublished,
  publishedAtDateOnly,
  scheduleSlotAt0900Ist,
  sortByPublishedDesc,
  toOpenGraphPublishedTime,
} from '@/lib/blog-schedule';

describe('blog-schedule IST parsing', () => {
  it('parses date-only publishedAt as midnight IST', () => {
    const instant = getPublishInstant('2026-06-01');
    expect(new Date(instant).toISOString()).toBe('2026-05-31T18:30:00.000Z');
  });

  it('parses datetime publishedAt with IST offset', () => {
    const instant = getPublishInstant('2026-06-02T09:00:00+05:30');
    expect(new Date(instant).toISOString()).toBe('2026-06-02T03:30:00.000Z');
  });

  it('returns true only after publish instant', () => {
    const publishedAt = '2026-06-02T09:00:00+05:30';
    const before = new Date('2026-06-02T03:29:59.000Z');
    const after = new Date('2026-06-02T03:30:00.000Z');

    expect(isPublished(publishedAt, before)).toBe(false);
    expect(isPublished(publishedAt, after)).toBe(true);
  });

  it('sorts posts newest first by publishedAt', () => {
    const sorted = sortByPublishedDesc([
      { title: 'older', publishedAt: '2026-06-01' },
      { title: 'newer', publishedAt: '2026-06-10' },
    ]);

    expect(sorted.map((post) => post.title)).toEqual(['newer', 'older']);
  });

  it('formats SEO helpers from IST values', () => {
    const publishedAt = '2026-06-02T09:00:00+05:30';
    expect(publishedAtDateOnly(publishedAt)).toBe('2026-06-02');
    expect(toOpenGraphPublishedTime('2026-06-01')).toBe('2026-05-31T18:30:00.000Z');
  });

  it('generates Tue/Thu 09:00 IST slots from 2026-06-02', () => {
    expect(scheduleSlotAt0900Ist(0)).toBe('2026-06-02T09:00:00+05:30');
    expect(scheduleSlotAt0900Ist(1)).toBe('2026-06-04T09:00:00+05:30');
    expect(scheduleSlotAt0900Ist(2)).toBe('2026-06-09T09:00:00+05:30');
  });
});
