import Link from 'next/link'
import { Tag, Calendar, ArrowRight } from 'lucide-react'
import type { Post } from '@/lib/posts'

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block no-underline">
      <article className="glass-card overflow-hidden">
        {post.image && (
          <div className="aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2.5 text-sm text-on-surface-variant">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary border border-primary/20">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs">
              <Calendar size={13} />
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {post.pinned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-container/60 px-3 py-0.5 text-xs font-medium text-on-tertiary-container border border-on-tertiary-container/20">
                📌 置顶
              </span>
            )}
          </div>

          <h2 className="mb-2 text-xl font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h2>

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
            {post.description}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 4).map(tag => (
                <span key={tag} className="tag-chip text-xs">
                  <Tag size={11} className="mr-1 opacity-60" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="inline-flex items-center px-2 py-0.5 text-xs text-on-surface-variant">+{post.tags.length - 4}</span>
              )}
            </div>
          )}

          <div className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-70 group-hover:opacity-100 group-hover:gap-2.5 transition-all duration-300">
            阅读更多 <ArrowRight size={15} />
          </div>
        </div>
      </article>
    </Link>
  )
}
