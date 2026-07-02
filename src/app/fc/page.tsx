import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import { getStats } from '@/lib/config'
import { getComments, getAllCommentsCount } from '@/lib/comments'
import Link from 'next/link'
import { FileText, Tag, FolderOpen, Plus, Type, CalendarDays, MessageCircle } from 'lucide-react'

export default function FcDashboard() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()
  const stats = getStats()
  const commentsCountMap = getAllCommentsCount()
  const totalComments = Object.values(commentsCountMap).reduce((sum, c) => sum + c, 0)

  // Gather latest 5 comments across all posts
  const allComments: { slug: string; title: string; nickname: string; content: string; createdAt: string }[] = []
  for (const post of posts) {
    const postComments = getComments(post.slug)
    for (const c of postComments) {
      allComments.push({ slug: post.slug, title: post.title, nickname: c.nickname, content: c.content, createdAt: c.createdAt })
    }
  }
  allComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const recentComments = allComments.slice(0, 5)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">仪表盘</h1>
          <p className="text-sm text-on-surface-variant">博客数据概览</p>
        </div>
        <Link
          href="/fc/posts/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity no-underline"
        >
          <Plus size={18} />
          新建文章
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
              <FileText size={20} className="text-on-primary-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">{posts.length}</p>
              <p className="text-xs text-on-surface-variant">文章总数</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-container">
              <FolderOpen size={20} className="text-on-secondary-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">{categories.length}</p>
              <p className="text-xs text-on-surface-variant">分类</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-container">
              <Tag size={20} className="text-on-tertiary-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">{tags.length}</p>
              <p className="text-xs text-on-surface-variant">标签</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
              <Type size={20} className="text-on-primary-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">{stats.totalWords.toLocaleString()}</p>
              <p className="text-xs text-on-surface-variant">总字数</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-container">
              <CalendarDays size={20} className="text-on-secondary-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">{stats.daysRunning}</p>
              <p className="text-xs text-on-surface-variant">运行天数</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-container">
              <MessageCircle size={20} className="text-on-tertiary-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">{totalComments}</p>
              <p className="text-xs text-on-surface-variant">评论总数</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="rounded-2xl border border-outline-variant bg-surface overflow-hidden">
        <div className="border-b border-outline-variant px-6 py-4">
          <h2 className="text-base font-semibold text-on-surface">最近文章</h2>
        </div>
        <div className="divide-y divide-outline-variant">
          {posts.slice(0, 10).map(post => (
            <div key={post.slug} className="flex items-center justify-between px-6 py-3.5">
              <div className="min-w-0 flex-1">
                <Link href={`/blog/${post.slug}`} className="font-medium text-on-surface hover:text-primary transition-colors no-underline">
                  {post.title}
                </Link>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-on-surface-variant">
                  <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                  <span className="rounded-full bg-primary-container px-2 py-0.5 text-on-primary-container">{post.category}</span>
                  {post.pinned && <span className="text-tertiary">📌 置顶</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <Link href={`/fc/posts/${post.slug}/edit`} className="rounded-lg bg-surface-container-high px-3 py-1.5 text-xs font-medium text-on-surface hover:bg-surface-container-higher transition-colors no-underline">
                  编辑
                </Link>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="px-6 py-8 text-center text-sm text-on-surface-variant">
              暂无文章
            </div>
          )}
        </div>
      </div>

      {/* Recent Comments */}
      <div className="mt-6 rounded-2xl border border-outline-variant bg-surface overflow-hidden">
        <div className="border-b border-outline-variant px-6 py-4">
          <h2 className="text-base font-semibold text-on-surface">最近评论</h2>
        </div>
        <div className="divide-y divide-outline-variant">
          {recentComments.map(comment => (
            <div key={comment.slug + comment.createdAt} className="px-6 py-3.5">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-on-surface">{comment.nickname}</span>
                    <span className="text-xs text-on-surface-variant">评论于</span>
                    <Link href={`/blog/${comment.slug}`} className="text-xs text-primary hover:underline no-underline">
                      {comment.title}
                    </Link>
                  </div>
                  <p className="mt-1 truncate text-sm text-on-surface-variant">{comment.content}</p>
                </div>
                <span className="shrink-0 ml-4 text-xs text-on-surface-variant">
                  {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
            </div>
          ))}
          {recentComments.length === 0 && (
            <div className="px-6 py-8 text-center text-sm text-on-surface-variant">
              暂无评论
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
