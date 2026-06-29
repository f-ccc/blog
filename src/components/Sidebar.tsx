import Link from 'next/link'
import { Tag, FolderOpen, Clock, CalendarDays } from 'lucide-react'
import type { Post } from '@/lib/types'
import TimeProgress from './widgets/TimeProgress'
import CalendarHeatmap from './widgets/CalendarHeatmap'
import BlogStats from './widgets/BlogStats'

export default function Sidebar({
  posts,
  tags,
  categories,
}: {
  posts: Post[]
  tags: string[]
  categories: string[]
}) {
  const recentPosts = posts.slice(0, 6)
  const pinnedPosts = posts.filter(p => p.pinned).slice(0, 3)

  return (
    <aside className="space-y-6">
      {/* 个人资料 */}
      <div className="rounded-2xl border border-outline-variant bg-surface p-5 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-2xl font-bold text-on-primary-container">
          B
        </div>
        <h3 className="text-base font-semibold text-on-surface">我的博客</h3>
        <p className="mt-1 text-xs text-on-surface-variant">分享技术、开发与生活</p>
        <div className="mt-3 flex justify-center gap-2">
          <a href="https://github.com/f-ccc" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-surface-container-high px-3 py-1 text-xs text-on-surface-variant hover:bg-surface-container-higher transition-colors no-underline">
            GitHub
          </a>
        </div>
      </div>

      {/* 公告（可选） */}
      <div className="rounded-2xl border border-outline-variant bg-surface p-5">
        <div className="flex items-start gap-3">
          <span className="text-lg">💡</span>
          <div>
            <h3 className="text-sm font-semibold text-on-surface">公告</h3>
            <p className="mt-1 text-xs text-on-surface-variant">欢迎来到我的博客！</p>
          </div>
        </div>
      </div>

      {/* 置顶文章 */}
      {pinnedPosts.length > 0 && (
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
            📌 置顶
          </h3>
          <ul className="space-y-2">
            {pinnedPosts.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-lg p-2 transition-colors hover:bg-surface-container-high no-underline">
                  <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-1">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 最新文章 */}
      <div className="rounded-2xl border border-outline-variant bg-surface p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
          <Clock size={16} /> 最新文章
        </h3>
        <ul className="space-y-2">
          {recentPosts.map(post => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-lg p-2 transition-colors hover:bg-surface-container-high no-underline">
                <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-1">{post.title}</span>
                <span className="text-xs text-on-surface-variant">{new Date(post.date).toLocaleDateString('zh-CN')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 时间进度条 */}
      <TimeProgress />

      {/* 日历热力图 */}
      <CalendarHeatmap posts={posts} />

      {/* 分类 */}
      {categories.length > 0 && (
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
            <FolderOpen size={16} /> 分类
          </h3>
          <div className="space-y-1">
            {categories.map(cat => (
              <Link key={cat} href={`/categories?name=${encodeURIComponent(cat)}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface no-underline">
                <span>{cat}</span>
                <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-xs">{posts.filter(p => p.category === cat).length}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 标签云 */}
      {tags.length > 0 && (
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
            <Tag size={16} /> 标签云
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Link key={tag} href={`/tags?name=${encodeURIComponent(tag)}`} className="tag-chip text-xs no-underline">{tag}</Link>
            ))}
          </div>
        </div>
      )}

      {/* 站点统计 */}
      <BlogStats />

      {/* 归档 */}
      <div className="rounded-2xl border border-outline-variant bg-surface p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
          <CalendarDays size={16} /> 归档
        </h3>
        <Link href="/archive" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface no-underline">
          <span>所有文章</span>
          <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-xs">{posts.length}</span>
        </Link>
      </div>
    </aside>
  )
}
