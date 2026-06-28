const IST = '+05:30';
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function parseDateOnlyParts(dateOnly: string): { year: number; month: number; day: number } {
  const [yearRaw, monthRaw, dayRaw] = dateOnly.split('-');
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    throw new Error(`Invalid date-only publishedAt value: ${dateOnly}`);
  }

  return { year, month, day };
}

function addIstDays(dateOnly: string, days: number): string {
  const instant = getPublishInstant(dateOnly);
  const next = new Date(instant + days * 24 * 60 * 60 * 1000);
  return formatIstDateOnly(next.getTime());
}

function formatIstDateOnly(instantMs: number): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(new Date(instantMs));
}

function getIstWeekday(dateOnly: string): number {
  const { year, month, day } = parseDateOnlyParts(dateOnly);
  const noonIst = new Date(
    `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T12:00:00${IST}`
  );
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
  }).format(noonIst);

  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return map[weekday] ?? 0;
}

export function getPublishInstant(publishedAt: string): number {
  if (DATE_ONLY_PATTERN.test(publishedAt)) {
    return new Date(`${publishedAt}T00:00:00${IST}`).getTime();
  }

  const instant = new Date(publishedAt).getTime();
  if (Number.isNaN(instant)) {
    throw new Error(`Invalid publishedAt value: ${publishedAt}`);
  }

  return instant;
}

export function isPublished(publishedAt: string, now: Date = new Date()): boolean {
  return now.getTime() >= getPublishInstant(publishedAt);
}

export function sortByPublishedDesc<T extends { publishedAt: string }>(posts: T[]): T[] {
  return [...posts].sort(
    (left, right) => getPublishInstant(right.publishedAt) - getPublishInstant(left.publishedAt)
  );
}

export function publishedAtDateOnly(publishedAt: string): string {
  if (DATE_ONLY_PATTERN.test(publishedAt)) {
    return publishedAt;
  }

  return formatIstDateOnly(getPublishInstant(publishedAt));
}

export function toOpenGraphPublishedTime(publishedAt: string): string {
  return new Date(getPublishInstant(publishedAt)).toISOString();
}

export function scheduleSlotAt0900Ist(slotIndex: number, startDate = '2026-06-02'): string {
  if (slotIndex < 0) {
    throw new Error('slotIndex must be zero or greater');
  }

  let cursor = startDate;
  while (getIstWeekday(cursor) !== 2) {
    cursor = addIstDays(cursor, 1);
  }

  const slots: string[] = [];
  while (slots.length <= slotIndex) {
    const weekday = getIstWeekday(cursor);
    if (weekday === 2 || weekday === 4) {
      slots.push(`${cursor}T09:00:00${IST}`);
    }
    cursor = addIstDays(cursor, 1);
  }

  const slot = slots[slotIndex];
  if (!slot) {
    throw new Error(`Unable to resolve schedule slot ${slotIndex}`);
  }

  return slot;
}

export function formatDisplayMonthYear(publishedAt: string): string {
  const instant = getPublishInstant(publishedAt);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    month: 'short',
    year: 'numeric',
  }).format(new Date(instant));
}
