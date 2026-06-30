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
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface">归档</h1>
        <p className="mt-1 text-on-surface-variant">共 {totalPosts} 篇文章</p>
      </div>

      <div className="space-y-10">
        {archive.map(({ year, months }) => (
          <section key={year}>
            <h2 className="mb-4 text-2xl font-bold text-primary">{year}</h2>
            <div className="space-y-4">
              {months.map(({ month, posts }) => (
                <div key={`${year}-${month}`}>
                  <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-on-surface">
                    <CalendarDays size={16} className="text-on-surface-variant" />
                    {month} 月 ({posts.length} 篇)
                  </h3>
                  <div className="ml-6 space-y-2 border-l-2 border-outline-variant pl-4">
                    {posts.map(post => (
                      <div key={post.slug} className="relative">
                        <div className="absolute -left-[21px] top-2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-surface" />
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group block rounded-lg p-2 transition-colors hover:bg-surface-container-high no-underline"
                        >
                          <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                            {post.title}
                          </span>
                          <span className="ml-3 text-xs text-on-surface-variant">
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
