import { SiteFooter } from '@/components/SiteFooter';
import { ToolHeader } from '@/components/ToolHeader';

interface AppShellProps {
  children: React.ReactNode;
  mainClassName?: string;
}

export function AppShell({ children, mainClassName = 'tool-main mx-auto max-w-2xl px-4 py-8 sm:py-10' }: AppShellProps) {
  return (
    <div className="tool-shell min-h-screen">
      <ToolHeader />
      <main className={mainClassName}>{children}</main>
      <SiteFooter />
    </div>
  );
}
