'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, MessageCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Comment {
  id: string
  slug: string
  nickname: string
  email: string
  content: string
  avatar: string
  createdAt: string
}

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const slug = decodeURIComponent(params.slug as string)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '默认',
    tags: '',
    content: '',
    published: true,
    pinned: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [loadingComments, setLoadingComments] = useState(true)

  const fetchComments = useCallback(() => {
    setLoadingComments(true)
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then(res => res.json())
      .then(data => {
        setComments(Array.isArray(data) ? data : [])
        setLoadingComments(false)
      })
      .catch(() => setLoadingComments(false))
  }, [slug])

  useEffect(() => {
    fetch(`/api/fc/posts/${encodeURIComponent(slug)}`)
      .then(res => res.json())
      .then(post => {
        if (post.error) {
          router.push('/fc/posts')
          return
        }
        setForm({
          title: post.title,
          description: post.description,
          category: post.category,
          tags: post.tags.join(', '),
          content: post.content,
          published: post.published,
          pinned: post.pinned,
        })
        setLoading(false)
      })
    fetchComments()
  }, [slug, router, fetchComments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const res = await fetch(`/api/fc/posts/${encodeURIComponent(slug)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      }),
    })

    if (res.ok) {
      router.push('/fc/posts')
      router.refresh()
    } else {
      alert('保存失败')
    }
    setSaving(false)
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('确定删除这条评论吗？')) return
    const res = await fetch(
      `/api/comments?slug=${encodeURIComponent(slug)}&id=${commentId}`,
      { method: 'DELETE' }
    )
    if (res.ok) {
      setComments(prev => prev.filter(c => c.id !== commentId))
    } else {
      alert('删除失败')
    }
  }

  const timeAgo = (dateStr: string) => {
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const diff = Math.floor((now - then) / 1000)
    if (diff < 60) return '刚刚'
    if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`
    if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`
    if (diff < 2592000) return `${Math.floor(diff / 86400)} 天前`
    return new Date(dateStr).toLocaleDateString('zh-CN')
  }

  if (loading) {
    return <div className="py-12 text-center text-on-surface-variant">加载中...</div>
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/fc/posts" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-container-high transition-colors no-underline">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-on-surface">编辑文章</h1>
          <p className="text-sm text-on-surface-variant">编辑: {form.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl border border-outline-variant bg-surface p-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">标题</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">分类</label>
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">标签 (逗号分隔)</label>
              <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">描述</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-on-surface">内容 (Markdown)</label>
            <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required rows={20}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-y" />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
              <span className="text-sm text-on-surface">发布</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.pinned} onChange={e => setForm({ ...form, pinned: e.target.checked })} />
              <span className="text-sm text-on-surface">置顶</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/fc/posts" className="rounded-xl border border-outline-variant px-6 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-high transition-colors no-underline">取消</Link>
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer">
            <Save size={16} />{saving ? '保存中...' : '保存'}
          </button>
        </div>
      </form>

      {/* 评论管理 */}
      <div className="mt-8 rounded-2xl border border-outline-variant bg-surface p-6">
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle size={18} className="text-primary" />
          <h2 className="text-lg font-semibold text-on-surface">评论管理</h2>
          <span className="ml-auto rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            {comments.length} 条
          </span>
        </div>

        {loadingComments ? (
          <div className="py-8 text-center text-sm text-on-surface-variant">加载评论中...</div>
        ) : comments.length === 0 ? (
          <div className="py-8 text-center text-sm text-on-surface-variant">
            暂无评论
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-3 rounded-xl border border-outline-variant/50 bg-surface-container-low p-4">
                <img
                  src={comment.avatar}
                  alt={comment.nickname}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-on-surface">{comment.nickname}</span>
                    <span className="text-[11px] text-on-surface-variant">{timeAgo(comment.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-on-surface-variant break-all">
                    {comment.content}
                  </p>
                  {comment.email && (
                    <p className="mt-1 text-[11px] text-on-surface-variant/60">{comment.email}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="shrink-0 self-start rounded-lg p-1.5 text-on-surface-variant/50 hover:bg-error/10 hover:text-error transition-colors cursor-pointer"
                  title="删除评论"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
