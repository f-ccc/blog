import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - 页面未找到',
}

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary border border-primary/20">
        404
      </div>
      <h1 className="mb-1.5 text-lg font-semibold text-on-surface">页面未找到</h1>
      <p className="mb-6 text-[12px] text-on-surface-variant">
        抱歉，你访问的页面不存在或已被移除。
      </p>
      <div className="flex gap-2.5">
        <Link
          href="/"
          className="rounded-lg bg-primary px-5 py-2 text-[12px] font-medium text-on-primary hover:opacity-90 transition-opacity duration-300 no-underline"
        >
          返回首页
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-outline-variant/40 px-5 py-2 text-[12px] font-medium text-on-surface hover:bg-surface-container-high transition-colors duration-300 no-underline"
        >
          浏览博客
        </Link>
      </div>
    </div>
  )
}
