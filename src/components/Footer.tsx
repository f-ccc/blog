'use client'

import { useConfig } from '@/hooks/useConfig'

export default function Footer() {
  const { config } = useConfig()
  const siteTitle = config?.siteTitle || '我的博客'

  return (
    <footer className="nav-glass mt-auto">
      <div className="mx-auto max-w-5xl px-5 py-6">
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
