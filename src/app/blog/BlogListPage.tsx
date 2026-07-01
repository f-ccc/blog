'use client'

import BlogCard from '@/components/BlogCard'
import Sidebar from '@/components/Sidebar'
import type { Post } from '@/lib/types'
import { useState, useMemo, useEffect } from 'react'
import { LayoutGrid, LayoutList } from 'lucide-react'

export default function BlogListPage({ posts: initialPosts }: { posts: Post[] }) {
  const [allPosts, setAllPosts] = useState<Post[]>(initialPosts)
  const [tags, setTags] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [layout, setLayout] = useState<'list' | 'grid'>('grid')

  useEffect(() => {
    setAllPosts(initialPosts)
    const ts = Array.from(new Set(initialPosts.flatMap(p => p.tags))).sort()
    const cats = Array.from(new Set(initialPosts.map(p => p.category))).sort()
    setTags(ts)
    setCategories(cats)
    const saved = localStorage.getItem('blog-layout')
    if (saved === 'list' || saved === 'grid') setLayout(saved)
  }, [initialPosts])

  const toggleLayout = () => {
    const next = layout === 'list' ? 'grid' : 'list'
    setLayout(next)
    localStorage.setItem('blog-layout', next)
  }

  const posts = useMemo(() => {
    return allPosts.filter(post => {
      if (selectedCategory && post.category !== selectedCategory) return false
      if (selectedTag && !post.tags.includes(selectedTag)) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tags.some(t => t.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [allPosts, search, selectedCategory, selectedTag])

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">博客</h1>
        <p className="mt-1 text-on-surface-variant">探索所有文章</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3 animate-fade-in-up">
        <input
          type="text"
          placeholder="搜索文章..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded-xl border border-outline-variant/40 bg-surface px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/40 flex-1 min-w-[200px] backdrop-blur-sm"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-outline-variant/40 bg-surface px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 backdrop-blur-sm"
        >
          <option value="">全部分类</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat} ({allPosts.filter(p => p.category === cat).length})</option>
          ))}
        </select>
        <button
          onClick={toggleLayout}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-outline-variant/40 bg-surface text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          title={layout === 'grid' ? '切换到列表视图' : '切换到网格视图'}
        >
          {layout === 'grid' ? <LayoutList size={18} /> : <LayoutGrid size={18} />}
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          {posts.length === 0 ? (
            <div className="glass-card-static p-12 text-center">
              <p className="text-lg text-on-surface-variant">没有匹配的文章</p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-[13px] text-on-surface-variant">共 {posts.length} 篇</p>
              <div className={layout === 'grid'
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 stagger-children'
                : 'flex flex-col gap-4 stagger-children'
              }>
                {posts.map(post => (
                  <BlogCard key={post.slug} post={post} variant={layout} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-full shrink-0 lg:w-80">
          <Sidebar posts={allPosts} tags={tags} categories={categories} />
        </div>
      </div>
    </div>
  )
}
