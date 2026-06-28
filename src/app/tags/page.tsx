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
    return <div className="mx-auto max-w-5xl px-4 py-8"><p className="text-on-surface-variant">加载中...</p></div>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface">标签</h1>
        <p className="mt-1 text-on-surface-variant">按标签浏览文章</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/tags"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors no-underline ${
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
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors no-underline ${
              selectedTag === tag
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-higher'
            }`}
          >
            {tag} ({allPosts.filter(p => p.tags.includes(tag)).length})
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-outline-variant bg-surface p-12 text-center">
            <p className="text-on-surface-variant">暂无文章</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block no-underline">
              <div className="rounded-2xl border border-outline-variant bg-surface p-5 card-hover">
                <h2 className="text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-on-surface-variant line-clamp-1">{post.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map(t => (
                    <span key={t} className="tag-chip text-xs">{t}</span>
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
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-8"><p className="text-on-surface-variant">加载中...</p></div>}>
      <TagsContent />
    </Suspense>
  )
}
