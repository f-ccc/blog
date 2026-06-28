'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { Send } from 'lucide-react'

export default function GuestbookPage() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSubmitted(true)
    // 在实际部署中可以保存留言
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface">留言板</h1>
        <p className="mt-1 text-on-surface-variant">留下你的想法和意见</p>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface p-6">
        {submitted ? (
          <div className="py-8 text-center">
            <p className="text-lg font-medium text-primary">感谢你的留言！🎉</p>
            <p className="mt-2 text-sm text-on-surface-variant">你的留言已成功提交</p>
            <button
              onClick={() => { setSubmitted(false); setName(''); setMessage('') }}
              className="mt-4 rounded-xl bg-surface-container-high px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-higher transition-colors cursor-pointer"
            >
              再写一条
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">昵称 *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="你的名字"
                required
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">留言 *</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="写下你的想法..."
                rows={4}
                required
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Send size={16} />
              发布留言
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
