import Link from 'next/link';
import { BrandIcon } from '@/components/BrandIcon';
import { BRAND } from '@/lib/constants';
import { EXTERNAL_LINKS } from '@/lib/links';

export function ToolHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <BrandIcon />
          <div className="min-w-0">
            <p className="text-base font-semibold tracking-tight text-zinc-900">{BRAND.name}</p>
            <p className="hidden text-xs text-zinc-500 lg:block">{BRAND.tagline}</p>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/blog"
            className="hidden rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:border-violet-200 hover:text-violet-700 sm:inline-flex sm:text-sm"
          >
            Blog
          </Link>
          <a
            href={EXTERNAL_LINKS.coffee}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1.5 text-xs font-semibold text-amber-900 shadow-sm transition-all hover:border-amber-300 hover:from-amber-100 hover:to-yellow-100 hover:shadow-md sm:px-4 sm:text-sm"
          >
            <span className="text-base leading-none transition-transform group-hover:scale-110" aria-hidden="true">
              ☕
            </span>
            <span className="hidden sm:inline">Buy me a coffee</span>
            <span className="sm:hidden">Coffee</span>
          </a>
        </div>
      </div>
    </header>
  );
}
