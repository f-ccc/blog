'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search as SearchIcon, FileText } from 'lucide-react'
import type { Post } from '@/lib/posts'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setSearched(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data)
    } catch {
      setResults([])
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">搜索</h1>
        <p className="mt-1 text-[13px] text-on-surface-variant">搜索博客文章</p>
      </div>

      <div className="mb-8 flex gap-3">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="输入关键词搜索..."
          className="flex-1 rounded-xl border border-outline-variant/40 bg-surface px-4 py-3 text-[13px] text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSearch}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[13px] font-medium text-on-primary hover:opacity-90 transition-opacity cursor-pointer"
        >
          <SearchIcon size={16} />
          搜索
        </button>
      </div>

      {searched && (
        <div>
          <p className="mb-4 text-[13px] text-on-surface-variant">
            找到 {results.length} 条结果
          </p>
          {results.length === 0 ? (
            <div className="glass-card-static p-12 text-center">
              <p className="text-[13px] text-on-surface-variant">未找到相关文章</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block no-underline">
                  <div className="rounded-2xl border border-outline-variant/40 bg-surface p-5 card-hover">
                    <div className="flex items-start gap-4">
                      <FileText size={18} className="mt-1 shrink-0 text-primary" />
                      <div>
                        <h2 className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">
                          {post.title}
                        </h2>
                        <p className="mt-1 text-[13px] text-on-surface-variant line-clamp-2">{post.description}</p>
                        <div className="mt-2 flex items-center gap-3 text-[11px] text-on-surface-variant">
                          <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                          <span className="rounded-full bg-primary-container px-2 py-0.5 text-on-primary-container">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
