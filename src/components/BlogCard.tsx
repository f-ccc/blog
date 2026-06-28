import Link from 'next/link'
import { Tag, Calendar, ArrowRight } from 'lucide-react'
import type { Post } from '@/lib/posts'

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block no-underline">
      <article className="card-hover rounded-2xl border border-outline-variant bg-surface p-6">
        {/* Category & Date */}
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-container px-3 py-0.5 text-xs font-medium text-on-primary-container">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          {post.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-container px-3 py-0.5 text-xs font-medium text-on-tertiary-container">
              📌 Pinned
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="mb-2 text-xl font-semibold text-on-surface group-hover:text-primary transition-colors">
          {post.title}
        </h2>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="tag-chip text-xs">
                <Tag size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more */}
        <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Read more <ArrowRight size={16} />
        </div>
      </article>
    </Link>
  )
}
