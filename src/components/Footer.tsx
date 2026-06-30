'use client'

import { useConfig } from '@/hooks/useConfig'

export default function Footer() {
  const { config } = useConfig()
  const siteTitle = config?.siteTitle || '我的博客'

  return (
    <footer className="border-t border-outline-variant bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-medium text-on-surface">
              &copy; {new Date().getFullYear()} {siteTitle}
            </p>
            <p className="text-xs text-on-surface-variant">
              Powered by Next.js &middot; Inspired by Firefly
            </p>
          </div>
          <div className="flex gap-4 text-xs text-on-surface-variant">
            {(config?.socialLinks?.length || 0) > 0 && config!.socialLinks!.map((link: { name: string; url: string }) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{link.name}</a>
            ))}
            <a href="/fc/login" className="hover:text-primary transition-colors">管理</a>
          </div>
        </div>
        {config?.footerBeian && (
          <div className="mt-3 text-center text-xs text-on-surface-variant">
            {config.footerBeian}
          </div>
        )}
        {config?.footerHtml && (
          <div className="mt-2 text-center text-xs text-on-surface-variant" dangerouslySetInnerHTML={{ __html: config.footerHtml }} />
        )}
      </div>
    </footer>
  )
}
