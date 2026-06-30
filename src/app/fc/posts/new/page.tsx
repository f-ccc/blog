'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    category: '默认',
    tags: '',
    content: '',
    published: true,
    pinned: false,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const rawSlug = form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '')
    const slug = rawSlug || `post-${Date.now()}`
    
    const res = await fetch('/api/fc/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        slug,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        date: new Date().toISOString().split('T')[0],
      }),
    })

    if (res.ok) {
      router.push('/fc/posts')
      router.refresh()
    } else {
      alert('创建失败')
    }
    setSaving(false)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/fc/posts" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-container-high transition-colors no-underline">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-on-surface">新建文章</h1>
          <p className="text-sm text-on-surface-variant">创建一篇新博客文章</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl border border-outline-variant bg-surface p-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">标题 *</label>
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">分类</label>
              <input
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">标签 (逗号分隔)</label>
              <input
                value={form.tags}
                onChange={e => setForm({ ...form, tags: e.target.value })}
                placeholder="技术, Web, JavaScript"
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">描述</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">内容 (Markdown) *</label>
            <textarea
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              required
              rows={15}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-y"
              placeholder={'# 文章标题\n\n文章内容...'}
            />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={e => setForm({ ...form, published: e.target.checked })}
                className="rounded border-outline-variant"
              />
              <span className="text-sm text-on-surface">发布</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.pinned}
                onChange={e => setForm({ ...form, pinned: e.target.checked })}
                className="rounded border-outline-variant"
              />
              <span className="text-sm text-on-surface">置顶</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/fc/posts"
            className="rounded-xl border border-outline-variant px-6 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-high transition-colors no-underline"
          >
            取消
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            <Save size={16} />
            {saving ? '保存中...' : '保存'}
          </button>
        </div>
      </form>
    </div>
  )
}
