#!/usr/bin/env node

/**
 * Assign Tue/Thu 09:00 IST publish slots to scheduled native posts.
 * Skips hrefs listed in SKIP_HREFS (already-live content).
 *
 * Usage: node scripts/reschedule-blog-posts.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogPostsPath = path.join(__dirname, '../data/blog-posts.ts');

const PUBLISH_ORDER = [
  '/blog/build-temporary-file-sharing-nextjs-pinata',
  '/blog/why-self-destructing-file-links-matter',
];

const SKIP_HREFS = new Set([
  '/blog/temporary-file-sharing-without-an-account',
  '/blog/secure-expiring-file-links-droplink',
  '/blog/how-droplink-uses-pinata-ipfs-turso',
]);

const IST = '+05:30';

function getIstWeekday(dateOnly) {
  const noonIst = new Date(`${dateOnly}T12:00:00${IST}`);
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
  }).format(noonIst);
  const map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return map[weekday] ?? 0;
}

function addIstDays(dateOnly, days) {
  const instant = new Date(`${dateOnly}T00:00:00${IST}`).getTime();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(new Date(instant + days * 24 * 60 * 60 * 1000));
}

function scheduleSlotAt0900Ist(slotIndex, startDate = '2026-06-02') {
  let cursor = startDate;
  while (getIstWeekday(cursor) !== 2) {
    cursor = addIstDays(cursor, 1);
  }

  const slots = [];
  while (slots.length <= slotIndex) {
    const weekday = getIstWeekday(cursor);
    if (weekday === 2 || weekday === 4) {
      slots.push(`${cursor}T09:00:00${IST}`);
    }
    cursor = addIstDays(cursor, 1);
  }

  return slots[slotIndex];
}

function formatDisplayMonthYear(publishedAt) {
  const instant = new Date(
    publishedAt.includes('T') ? publishedAt : `${publishedAt}T00:00:00${IST}`
  ).getTime();
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    month: 'short',
    year: 'numeric',
  }).format(new Date(instant));
}

let source = readFileSync(blogPostsPath, 'utf8');
let slotIndex = 8;

for (const href of PUBLISH_ORDER) {
  if (SKIP_HREFS.has(href)) {
    console.log(`skip ${href}`);
    continue;
  }

  const publishedAt = scheduleSlotAt0900Ist(slotIndex);
  const displayDate = formatDisplayMonthYear(publishedAt);
  const escapedHref = href.replace(/\//g, '\\/');

  source = source.replace(
    new RegExp(`(href: '${escapedHref}',[\\s\\S]*?publishedAt: )'[^']+'`),
    `$1'${publishedAt}'`
  );
  source = source.replace(
    new RegExp(`(href: '${escapedHref}',[\\s\\S]*?date: )'[^']+'`),
    `$1'${displayDate}'`
  );

  console.log(`${href} -> ${publishedAt} (${displayDate})`);
  slotIndex += 1;
}

writeFileSync(blogPostsPath, source);
console.log('Updated data/blog-posts.ts');
