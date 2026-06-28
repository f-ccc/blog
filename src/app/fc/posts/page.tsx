import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { Plus, FileText } from 'lucide-react'
import PostActions from './PostActions'

export default function FcPostsPage() {
  const posts = getAllPosts()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">文章管理</h1>
          <p className="text-sm text-on-surface-variant">管理所有博客文章</p>
        </div>
        <Link
          href="/fc/posts/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity no-underline"
        >
          <Plus size={18} />
          新建文章
        </Link>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface overflow-hidden">
        <div className="divide-y divide-outline-variant">
          {posts.map(post => (
            <div key={post.slug} className="flex items-center justify-between px-6 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="shrink-0 text-on-surface-variant" />
                  <Link href={`/blog/${post.slug}`} className="font-medium text-on-surface hover:text-primary transition-colors no-underline">
                    {post.title}
                  </Link>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-on-surface-variant">
                  <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                  <span className="rounded-full bg-primary-container px-2 py-0.5">{post.category}</span>
                  {post.pinned && <span className="text-tertiary">📌 置顶</span>}
                  <span>{post.tags?.length || 0} 标签</span>
                </div>
              </div>
              <PostActions slug={post.slug} />
            </div>
          ))}
          {posts.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-on-surface-variant">
              暂无文章，点击上方按钮创建
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
