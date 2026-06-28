import Link from 'next/link'
import { Tag, FolderOpen, Clock } from 'lucide-react'
import type { Post } from '@/lib/posts'

export default function Sidebar({
  posts,
  tags,
  categories,
}: {
  posts: Post[]
  tags: string[]
  categories: string[]
}) {
  const recentPosts = posts.slice(0, 5)

  return (
    <aside className="space-y-6">
      {/* About Card */}
      <div className="rounded-2xl border border-outline-variant bg-surface p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
          About
        </h3>
        <p className="text-sm leading-relaxed text-on-surface-variant">
          A personal blog built with Next.js, inspired by the clean and modern
          Material Design 3 style of Firefly.
        </p>
      </div>

      {/* Recent Posts */}
      <div className="rounded-2xl border border-outline-variant bg-surface p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
          <Clock size={16} /> Recent Posts
        </h3>
        <ul className="space-y-2">
          {recentPosts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-lg p-2 transition-colors hover:bg-surface-container-high no-underline"
              >
                <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                  {post.title}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {new Date(post.date).toLocaleDateString('zh-CN')}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            <FolderOpen size={16} /> Categories
          </h3>
          <div className="space-y-1">
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface no-underline"
              >
                <span>{cat}</span>
                <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-xs">
                  {posts.filter(p => p.category === cat).length}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            <Tag size={16} /> Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="tag-chip text-xs no-underline"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
