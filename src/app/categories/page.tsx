'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import type { Post } from '@/lib/types'

function CategoriesContent() {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('name')
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

  const categories = Array.from(new Set(allPosts.map(p => p.category))).sort()
  const filteredPosts = selectedCategory
    ? allPosts.filter(p => p.category === selectedCategory)
    : allPosts

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-8"><p className="text-on-surface-variant">加载中...</p></div>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface">分类</h1>
        <p className="mt-1 text-on-surface-variant">按分类浏览文章</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/categories"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors no-underline ${
            !selectedCategory
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-higher'
          }`}
        >
          全部
        </Link>
        {categories.map(cat => (
          <Link
            key={cat}
            href={`/categories?name=${encodeURIComponent(cat)}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors no-underline ${
              selectedCategory === cat
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-higher'
            }`}
          >
            {cat} ({allPosts.filter(p => p.category === cat).length})
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
                <div className="mt-2 flex items-center gap-3 text-xs text-on-surface-variant">
                  <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                  <span className="rounded-full bg-primary-container px-2 py-0.5 text-on-primary-container">
                    {post.category}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-8"><p className="text-on-surface-variant">加载中...</p></div>}>
      <CategoriesContent />
    </Suspense>
  )
}
