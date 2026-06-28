import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: '友情链接',
  description: '友情链接',
}

interface Friend {
  name: string
  url: string
  description: string
  avatar?: string
}

const friends: Friend[] = [
  {
    name: 'Firefly',
    url: 'https://github.com/CuteLeaf/Firefly',
    description: '清新美观的 Astro 静态博客主题模板',
  },
]

export default function FriendsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface">友情链接</h1>
        <p className="mt-1 text-on-surface-variant">我的朋友们</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {friends.map(friend => (
          <a
            key={friend.url}
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover flex items-start gap-4 rounded-2xl border border-outline-variant bg-surface p-5 no-underline"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-container text-lg font-bold text-on-primary-container">
              {friend.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <h3 className="text-base font-semibold text-on-surface">{friend.name}</h3>
                <ExternalLink size={14} className="text-on-surface-variant shrink-0" />
              </div>
              <p className="mt-1 text-sm text-on-surface-variant line-clamp-2">{friend.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-outline-variant bg-surface p-6 text-center">
        <p className="text-sm text-on-surface-variant">
          想要交换友链？请联系我！
        </p>
      </div>
    </div>
  )
}
