'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { Menu, X, Search } from 'lucide-react'
import { useState } from 'react'
import { useConfig } from '@/hooks/useConfig'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { config } = useConfig()
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const siteTitle = config?.siteTitle || '我的博客'
  const initial = siteTitle.charAt(0)

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/blog', label: '博客' },
    { href: '/categories', label: '分类' },
    { href: '/tags', label: '标签' },
    { href: '/archive', label: '归档' },
    { href: '/about', label: '关于' },
  ]

  return (
    <header className="sticky top-0 z-50 nav-glass">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2 text-lg font-semibold tracking-tight text-on-surface no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-sm font-semibold text-primary transition-transform group-hover:scale-105">
            {initial}
          </span>
          <span className="hidden sm:inline bg-gradient-to-r from-on-surface to-primary/80 bg-clip-text text-transparent">{siteTitle}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-1.5 text-[13px] font-medium no-underline transition-colors duration-200 ${
                  active
                    ? 'text-on-surface after:absolute after:bottom-[-2px] after:left-1/2 after:h-[1.5px] after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="ml-3 flex items-center gap-0.5">
            <Link
              href="/search"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-all duration-200 hover:text-primary hover:bg-primary/8 no-underline"
              aria-label="搜索"
            >
              <Search size={16} />
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-0.5 md:hidden">
          <Link href="/search" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors duration-200 hover:text-primary no-underline">
            <Search size={16} />
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-primary/8 cursor-pointer"
            aria-label="菜单"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-slide-down border-t border-outline-variant/20 px-3 pb-3 pt-1 md:hidden" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px) saturate(1.5)' }}>
          {navLinks.map((link, i) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-[44px] items-center rounded-xl px-3 py-2.5 text-[15px] font-medium no-underline transition-colors duration-200 ${
                  active
                    ? 'text-on-surface bg-primary/6'
                    : 'text-on-surface-variant hover:bg-primary/8 hover:text-on-surface'
                }`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
