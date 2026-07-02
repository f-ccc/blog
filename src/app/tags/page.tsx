'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import type { Post } from '@/lib/types'

function TagsContent() {
  const searchParams = useSearchParams()
  const selectedTag = searchParams.get('name')
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setAllPosts(data)
        setLoading(false)
      })
  }, [])

  const tags = Array.from(new Set(allPosts.flatMap(p => p.tags))).sort()
  const filteredPosts = selectedTag
    ? allPosts.filter(p => p.tags.includes(selectedTag))
    : allPosts

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-6"><p className="text-[12px] text-on-surface-variant">加载中...</p></div>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-on-surface">标签</h1>
        <p className="mt-0.5 text-[12px] text-on-surface-variant">按标签浏览文章</p>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        <Link
          href="/tags"
          className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors duration-300 no-underline ${
            !selectedTag
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-higher'
          }`}
        >
          全部
        </Link>
        {tags.map(tag => (
          <Link
            key={tag}
            href={`/tags?name=${encodeURIComponent(tag)}`}
            className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors duration-300 no-underline ${
              selectedTag === tag
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-higher'
            }`}
          >
            {tag} ({allPosts.filter(p => p.tags.includes(tag)).length})
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {filteredPosts.length === 0 ? (
          <div className="glass-card-static p-10 text-center">
            <p className="text-[12px] text-on-surface-variant">暂无文章</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block no-underline">
              <div className="rounded-xl border border-outline-variant/40 bg-surface p-4 card-hover">
                <h2 className="text-[13px] font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="mt-0.5 text-[12px] text-on-surface-variant line-clamp-1">{post.description}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {post.tags.map(t => (
                    <span key={t} className="tag-chip text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default function TagsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-6"><p className="text-[12px] text-on-surface-variant">加载中...</p></div>}>
      <TagsContent />
    </Suspense>
  )
}
