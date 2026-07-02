import Link from 'next/link'
import { Tag, Calendar, ArrowRight, Pin, Clock } from 'lucide-react'
import type { Post } from '@/lib/posts'
import { getReadingTime } from '@/lib/utils'

export default function BlogCard({ post, variant = 'list' }: { post: Post; variant?: 'list' | 'grid' }) {
  const readTime = getReadingTime(post.content)

  if (variant === 'grid') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block no-underline">
        <article className="glass-card overflow-hidden h-full flex flex-col transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-0.5 group-hover:shadow-lg">
          {post.image ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="aspect-[16/10] w-full bg-gradient-to-br from-primary/10 via-primary-container/20 to-secondary-container/15 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/25 drop-shadow-sm">{post.title.charAt(0)}</span>
            </div>
          )}
          <div className="p-4 flex flex-col flex-1">
            <div className="mb-2 flex items-center gap-2 text-xs text-on-surface-variant">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary border border-primary/15">{post.category}</span>
              <span className="inline-flex items-center gap-1"><Calendar size={12} />{new Date(post.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
              <span className="inline-flex items-center gap-1"><Clock size={11} />{readTime} 分钟</span>
              {post.pinned && <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary/10"><Pin size={9} className="text-primary" /></span>}
            </div>
            <h2 className="mb-1.5 text-[15px] font-semibold text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-2">{post.title}</h2>
            <p className="mb-3 line-clamp-2 text-[13px] leading-relaxed text-on-surface-variant flex-1">{post.description}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map(tag => <span key={tag} className="tag-chip text-[11px] py-0 px-2">{tag}</span>)}
              </div>
            )}
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block no-underline">
      <article className="glass-card overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-0.5 group-hover:shadow-lg">
        <div className="flex flex-col sm:flex-row">
          {post.image ? (
            <div className="relative w-full sm:w-48 shrink-0 overflow-hidden sm:aspect-[4/3]">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="w-full sm:w-48 shrink-0 sm:aspect-[4/3] bg-gradient-to-br from-primary/10 via-primary-container/20 to-secondary-container/15 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary/25 drop-shadow-sm">{post.title.charAt(0)}</span>
            </div>
          )}
          <div className="p-5 flex flex-col flex-1 min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary border border-primary/15">{post.category}</span>
              <span className="inline-flex items-center gap-1"><Calendar size={12} />{new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="inline-flex items-center gap-1"><Clock size={11} />{readTime} 分钟</span>
              {post.pinned && <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary/10"><Pin size={9} className="text-primary" /></span>}
            </div>
            <h2 className="mb-1.5 text-base font-semibold text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-1">{post.title}</h2>
            <p className="mb-3 line-clamp-2 text-[13px] leading-relaxed text-on-surface-variant">{post.description}</p>
            <div className="mt-auto flex items-center justify-between">
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map(tag => <span key={tag} className="tag-chip text-[11px] py-0 px-2">{tag}</span>)}
                </div>
              ) : <span />}
              <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                阅读 <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
