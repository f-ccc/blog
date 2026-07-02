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
    return <div className="mx-auto max-w-5xl px-4 py-6"><p className="text-[12px] text-on-surface-variant">加载中...</p></div>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-on-surface">分类</h1>
        <p className="mt-0.5 text-[12px] text-on-surface-variant">按分类浏览文章</p>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        <Link
          href="/categories"
          className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors duration-300 no-underline ${
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
            className={`rounded-full px-3 py-1 text-[12px] font-medium transition-colors duration-300 no-underline ${
              selectedCategory === cat
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-higher'
            }`}
          >
            {cat} ({allPosts.filter(p => p.category === cat).length})
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
                <div className="mt-1.5 flex items-center gap-2.5 text-[11px] text-on-surface-variant">
                  <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                  <span className="rounded-full bg-primary-container px-2 py-0.5 text-on-primary-container text-[10px]">
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
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-6"><p className="text-[12px] text-on-surface-variant">加载中...</p></div>}>
      <CategoriesContent />
    </Suspense>
  )
}
