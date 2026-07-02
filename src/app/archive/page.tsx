import { getArchiveData } from '@/lib/posts'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '归档',
  description: '文章归档',
}

export default function ArchivePage() {
  const archive = getArchiveData()
  const totalPosts = archive.reduce((sum, year) => sum + year.months.reduce((s, m) => s + m.posts.length, 0), 0)

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-on-surface">归档</h1>
        <p className="mt-0.5 text-[12px] text-on-surface-variant">共 {totalPosts} 篇文章</p>
      </div>

      <div className="space-y-8">
        {archive.map(({ year, months }) => (
          <section key={year}>
            <h2 className="mb-3 text-lg font-bold text-primary">{year}</h2>
            <div className="space-y-3">
              {months.map(({ month, posts }) => (
                <div key={`${year}-${month}`}>
                  <h3 className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-on-surface">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10"><CalendarDays size={11} className="text-primary" /></span>
                    {month} 月 ({posts.length} 篇)
                  </h3>
                  <div className="ml-4 space-y-1 border-l border-outline-variant/40 pl-3">
                    {posts.map(post => (
                      <div key={post.slug} className="relative">
                        <div className="absolute -left-[17px] top-1.5 h-1.5 w-1.5 rounded-full border-2 border-primary bg-surface" />
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group block rounded-lg p-1.5 transition-colors hover:bg-surface-container-high no-underline"
                        >
                          <span className="text-[12px] font-medium text-on-surface group-hover:text-primary transition-colors duration-300">
                            {post.title}
                          </span>
                          <span className="ml-3 text-[11px] text-on-surface-variant">
                            {new Date(post.date).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
