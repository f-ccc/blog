import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - 页面未找到',
}

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-container text-5xl font-bold text-on-primary-container">
        404
      </div>
      <h1 className="mb-2 text-2xl font-bold text-on-surface">页面未找到</h1>
      <p className="mb-8 text-sm text-on-surface-variant">
        抱歉，你访问的页面不存在或已被移除。
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity no-underline"
        >
          返回首页
        </Link>
        <Link
          href="/blog"
          className="rounded-xl border border-outline-variant px-6 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-high transition-colors no-underline"
        >
          浏览博客
        </Link>
      </div>
    </div>
  )
}
