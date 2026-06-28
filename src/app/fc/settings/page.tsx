'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

export default function FcSettingsPage() {
  const [saving, setSaving] = useState(false)
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    // Password change simulated - in production, store hashed
    setTimeout(() => {
      setMessage('密码已更新（演示功能）')
      setSaving(false)
      setPassword('')
    }, 500)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-on-surface">设置</h1>
        <p className="text-sm text-on-surface-variant">博客设置</p>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-outline-variant bg-surface p-6">
          <h2 className="mb-4 text-base font-semibold text-on-surface">修改密码</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-on-surface">新密码</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="输入新密码"
                className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={saving || !password}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              <Save size={16} />
              {saving ? '保存中...' : '更新密码'}
            </button>
            {message && <p className="text-sm text-primary">{message}</p>}
          </form>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface p-6">
          <h2 className="mb-2 text-base font-semibold text-on-surface">博客信息</h2>
          <div className="space-y-2 text-sm text-on-surface-variant">
            <p>框架: Next.js 16</p>
            <p>文章存储: Markdown 文件 (src/content/posts/)</p>
            <p>管理后台: /fc</p>
          </div>
        </div>
      </div>
    </div>
  )
}
