'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { Menu, X, Search } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/blog', label: '博客' },
    { href: '/categories', label: '分类' },
    { href: '/tags', label: '标签' },
    { href: '/archive', label: '归档' },
    { href: '/about', label: '关于' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-on-surface no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-on-primary">
            B
          </span>
          <span className="hidden sm:inline">我的博客</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors no-underline"
            aria-label="搜索"
          >
            <Search size={18} />
          </Link>
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <Link href="/search" className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high no-underline">
            <Search size={18} />
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-container-high cursor-pointer"
            aria-label="菜单"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-outline-variant bg-surface px-4 pb-4 pt-2 md:hidden">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface no-underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
