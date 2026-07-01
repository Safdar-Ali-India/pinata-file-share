import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BRAND } from '@/lib/constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DropLink — Temporary file sharing',
  description: BRAND.tagline,
  verification: {
    google: 'UsecGm5YaeLB4WqJdc4gOA9fnoXI9CJyNPdGFblzYN4',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-zinc-50 font-sans text-zinc-900 antialiased">{children}</body>
    </html>
  );
}
