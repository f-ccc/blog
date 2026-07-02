import Link from 'next/link'
import { Calendar, ArrowRight, Pin, Clock } from 'lucide-react'
import type { Post } from '@/lib/posts'
import { getReadingTime } from '@/lib/utils'

export default function BlogCard({ post, variant = 'list' }: { post: Post; variant?: 'list' | 'grid' }) {
  const readTime = getReadingTime(post.content)

  if (variant === 'grid') {
    return (
      <Link href={`/blog/${post.slug}`} className="group block no-underline">
        <article className="glass-card overflow-hidden h-full flex flex-col transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-[1px] group-hover:shadow-lg">
          {post.image ? (
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          ) : (
            <div className="aspect-[3/2] w-full bg-gradient-to-br from-primary/8 via-primary-container/15 to-secondary-container/10 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary/20 drop-shadow-sm">{post.title.charAt(0)}</span>
            </div>
          )}
          <div className="p-3.5 flex flex-col flex-1">
            <div className="mb-2 flex items-center gap-1.5 text-on-surface-variant flex-wrap">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary border border-primary/12">{post.category}</span>
              <span className="inline-flex items-center gap-0.5 text-[11px]"><Calendar size={10} className="opacity-60" />{new Date(post.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
              <span className="inline-flex items-center gap-0.5 text-[11px]"><Clock size={10} className="opacity-60" />{readTime}分钟</span>
              {post.pinned && <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-primary/10 ml-auto"><Pin size={8} className="text-primary" /></span>}
            </div>
            <h2 className="mb-1 text-[15px] font-semibold leading-snug text-on-surface group-hover:text-primary transition-colors duration-200 line-clamp-2">{post.title}</h2>
            <p className="mb-2.5 line-clamp-2 text-[12px] leading-relaxed text-on-surface-variant flex-1">{post.description}</p>
            <div className="mt-auto flex items-center justify-between">
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map(tag => <span key={tag} className="tag-chip text-[10px] px-1.5 py-px">{tag}</span>)}
                </div>
              ) : <span />}
              <ArrowRight size={13} className="text-primary opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-200" />
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block no-underline">
      <article className="glass-card overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:-translate-y-[1px] group-hover:shadow-lg">
        <div className="flex flex-col sm:flex-row">
          {post.image ? (
            <div className="relative w-full sm:w-44 shrink-0 overflow-hidden sm:aspect-[4/3]">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          ) : (
            <div className="w-full sm:w-44 shrink-0 sm:aspect-[4/3] bg-gradient-to-br from-primary/8 via-primary-container/15 to-secondary-container/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary/20 drop-shadow-sm">{post.title.charAt(0)}</span>
            </div>
          )}
          <div className="p-4 flex flex-col flex-1 min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5 text-on-surface-variant">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary border border-primary/12">{post.category}</span>
              <span className="inline-flex items-center gap-0.5 text-[11px]"><Calendar size={10} className="opacity-60" />{new Date(post.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
              <span className="inline-flex items-center gap-0.5 text-[11px]"><Clock size={10} className="opacity-60" />{readTime}分钟</span>
              {post.pinned && <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-primary/10"><Pin size={8} className="text-primary" /></span>}
            </div>
            <h2 className="mb-1 text-base font-semibold leading-snug text-on-surface group-hover:text-primary transition-colors duration-200 line-clamp-1">{post.title}</h2>
            <p className="mb-2.5 line-clamp-2 text-[12px] leading-relaxed text-on-surface-variant">{post.description}</p>
            <div className="mt-auto flex items-center justify-between">
              {post.tags && post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map(tag => <span key={tag} className="tag-chip text-[10px] px-1.5 py-px">{tag}</span>)}
                </div>
              ) : <span />}
              <span className="flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 group-hover:opacity-80 transition-all duration-200">
                阅读 <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
