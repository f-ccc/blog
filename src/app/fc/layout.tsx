import type { Metadata } from 'next'
import Link from 'next/link'
import { LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react'

export const metadata: Metadata = {
  title: '管理后台',
}

export default function FcLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-outline-variant bg-surface md:block">
        <div className="p-4">
          <h2 className="text-lg font-bold text-on-surface">管理后台</h2>
        </div>
        <nav className="space-y-1 px-3">
          <NavItem href="/fc" icon={<LayoutDashboard size={18} />} label="仪表盘" />
          <NavItem href="/fc/posts" icon={<FileText size={18} />} label="文章管理" />
          <NavItem href="/fc/settings" icon={<Settings size={18} />} label="设置" />
        </nav>
        <div className="absolute bottom-4 px-3 w-60">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors no-underline"
          >
            <LogOut size={18} />
            返回前台
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-outline-variant bg-surface px-4 py-3 md:hidden">
          <h2 className="text-base font-bold text-on-surface">管理后台</h2>
          <div className="flex gap-2">
            <MobileNavItem href="/fc" label="仪表盘" />
            <MobileNavItem href="/fc/posts" label="文章" />
            <MobileNavItem href="/fc/settings" label="设置" />
          </div>
        </div>
        <div className="flex-1 p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors no-underline"
    >
      {icon}
      {label}
    </Link>
  )
}

function MobileNavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors no-underline"
    >
      {label}
    </Link>
  )
}
