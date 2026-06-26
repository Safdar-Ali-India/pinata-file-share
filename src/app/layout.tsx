import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pinata File Share',
  description: 'Secure temporary file sharing powered by Pinata IPFS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
