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
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2 text-lg font-semibold tracking-tight text-on-surface no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-sm font-semibold text-primary transition-transform group-hover:scale-105">
            {initial}
          </span>
          <span className="hidden sm:inline bg-gradient-to-r from-on-surface to-primary/80 bg-clip-text text-transparent">{siteTitle}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-lg px-3 py-1.5 text-[13px] font-medium text-on-surface-variant transition-colors duration-300 hover:text-on-surface no-underline after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-all after:duration-300 hover:after:w-4"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-0.5">
            <Link
              href="/search"
              className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-primary/8 transition-all duration-300 no-underline"
              aria-label="搜索"
            >
              <Search size={16} />
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-0.5 md:hidden">
          <Link href="/search" className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant hover:text-primary no-underline">
            <Search size={16} />
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary/8 cursor-pointer transition-colors"
            aria-label="菜单"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-slide-down border-t border-outline-variant/20 px-4 pb-4 pt-2 md:hidden" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px)' }}>
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
