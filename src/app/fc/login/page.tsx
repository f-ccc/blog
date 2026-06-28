'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/fc/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/fc')
      router.refresh()
    } else {
      setError('密码错误')
    }
    setLoading(false)
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm items-center px-4 py-12">
      <div className="w-full">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container">
            <Lock size={28} className="text-on-primary-container" />
          </div>
          <h1 className="text-2xl font-bold text-on-surface">管理后台</h1>
          <p className="mt-1 text-sm text-on-surface-variant">请输入密码登录</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="输入密码"
              autoFocus
              className="w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          {error && (
            <p className="text-sm text-error">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {loading ? '验证中...' : '登录'}
          </button>
        </form>
      </div>
    </div>
  )
}
