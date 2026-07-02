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
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold tracking-tight text-on-surface">友情链接</h1>
        <p className="mt-0.5 text-[12px] text-on-surface-variant">我的朋友们</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {friends.map(friend => (
          <a
            key={friend.url}
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover flex items-start gap-3 rounded-xl border border-outline-variant/40 bg-surface p-4 no-underline"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {friend.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <h3 className="text-[12px] font-semibold text-on-surface">{friend.name}</h3>
                <ExternalLink size={10} className="text-on-surface-variant shrink-0" />
              </div>
              <p className="mt-0.5 text-[12px] text-on-surface-variant line-clamp-2">{friend.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 glass-card-static p-5 text-center">
        <p className="text-[12px] text-on-surface-variant">
          想要交换友链？请联系我！
        </p>
      </div>
    </div>
  )
}
