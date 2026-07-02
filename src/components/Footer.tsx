'use client'

import { useConfig } from '@/hooks/useConfig'
import { useState, useEffect, useCallback } from 'react'

export default function Footer() {
  const { config } = useConfig()
  const siteTitle = config?.siteTitle || '我的博客'

  const [daysRunning, setDaysRunning] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)

  // Calculate days running from siteStartDate
  useEffect(() => {
    if (!config?.siteStartDate) return
    const start = new Date(config.siteStartDate as string)
    const now = new Date()
    const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    setDaysRunning(Math.max(0, days))
  }, [config?.siteStartDate])

  // Fetch stats for article count
  useEffect(() => {
    fetch('/api/stats', { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data?.totalPosts != null) setTotalPosts(data.totalPosts) })
      .catch(() => {})
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <footer className="nav-glass mt-auto">
      <div className="mx-auto max-w-5xl px-5 py-6">
        {/* Stats row */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-on-surface-variant">
          {daysRunning > 0 && (
            <span className="inline-flex items-center gap-1">
              <span className="text-primary/70">●</span>
              已运行 <span className="font-medium text-on-surface/80">{daysRunning}</span> 天
            </span>
          )}
          {totalPosts > 0 && (
            <span className="inline-flex items-center gap-1">
              <span className="text-secondary/70">●</span>
              共 <span className="font-medium text-on-surface/80">{totalPosts}</span> 篇文章
            </span>
          )}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-on-surface-variant/70 hover:text-primary transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
            aria-label="回到顶部"
          >
            ↑ 回到顶部
          </button>
        </div>

        {/* Divider */}
        <div className="mb-3 h-px bg-outline-variant/20" />

        {/* Copyright & links */}
        <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <div>
            <p className="text-[13px] font-medium text-on-surface">
              &copy; {new Date().getFullYear()} {siteTitle}
            </p>
            <p className="text-[11px] text-on-surface-variant mt-0.5 tracking-wide">
              Powered by <span className="text-primary/80">Next.js</span> &middot; Crafted with care
            </p>
          </div>
          <div className="flex gap-4 text-[11px] text-on-surface-variant">
            {(config?.socialLinks?.length || 0) > 0 && config!.socialLinks!.map((link: { name: string; url: string }) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300 no-underline">{link.name}</a>
            ))}
            <a href="/fc/login" className="hover:text-primary transition-colors duration-300 no-underline">管理</a>
          </div>
        </div>
        {config?.footerBeian && (
          <div className="mt-2 text-center text-[11px] text-on-surface-variant">
            {config.footerBeian}
          </div>
        )}
        {config?.footerHtml && (
          <div className="mt-1.5 text-center text-[11px] text-on-surface-variant" dangerouslySetInnerHTML={{ __html: config.footerHtml }} />
        )}
      </div>
    </footer>
  )
}
