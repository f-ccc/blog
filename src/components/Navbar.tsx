'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { Menu, X, Search } from 'lucide-react'
import { useState } from 'react'
import { useConfig } from '@/hooks/useConfig'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { config } = useConfig()

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
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-on-surface no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/90 text-sm font-bold text-on-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
            {initial}
          </span>
          <span className="hidden sm:inline bg-gradient-to-r from-on-surface to-primary bg-clip-text text-transparent">{siteTitle}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-xl px-3.5 py-2 text-sm font-medium text-on-surface-variant transition-all duration-300 hover:text-on-surface hover:bg-primary/8 no-underline"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-1">
            <Link
              href="/search"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/8 transition-all duration-300 no-underline"
              aria-label="搜索"
            >
              <Search size={18} />
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <Link href="/search" className="flex h-9 w-9 items-center justify-center rounded-xl text-on-surface-variant hover:text-primary no-underline">
            <Search size={18} />
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-primary/8 cursor-pointer transition-colors"
            aria-label="菜单"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-slide-down border-t border-outline-variant/30 px-4 pb-4 pt-2 md:hidden" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)' }}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-base font-medium text-on-surface-variant hover:bg-primary/8 hover:text-on-surface no-underline transition-colors"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
