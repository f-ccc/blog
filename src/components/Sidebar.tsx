'use client'

import Link from 'next/link'
import { Tag, FolderOpen, Clock, CalendarDays, Megaphone, Pin, MessageCircle } from 'lucide-react'
import type { Post } from '@/lib/types'
import type { Comment } from '@/lib/comments'
import { useConfig } from '@/hooks/useConfig'
import TimeProgress from './widgets/TimeProgress'
import CalendarHeatmap from './widgets/CalendarHeatmap'
import BlogStats from './widgets/BlogStats'
import WeatherWidget from './widgets/WeatherWidget'
import EventCountdown from './widgets/EventCountdown'

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return '\u521a\u521a'
  if (diff < 3600) return `${Math.floor(diff / 60)} \u5206\u949f\u524d`
  if (diff < 86400) return `${Math.floor(diff / 3600)} \u5c0f\u65f6\u524d`
  if (diff < 2592000) return `${Math.floor(diff / 86400)} \u5929\u524d`
  return new Date(dateStr).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function Sidebar({
  posts,
  tags,
  categories,
  recentComments = [],
}: {
  posts: Post[]
  tags: string[]
  categories: string[]
  recentComments?: Comment[]
}) {
  const { config } = useConfig()
  const recentPosts = posts.slice(0, 6)
  const pinnedPosts = posts.filter(p => p.pinned).slice(0, 3)

  const siteTitle = config?.siteTitle || '\u6211\u7684\u535a\u5ba2'
  const initial = siteTitle.charAt(0)

  return (
    <aside className="space-y-3 stagger-children">
      {/* \u4e2a\u4eba\u8d44\u6599 */}
      {config?.showProfile !== false && (
        <div className="glass-card-static p-4 text-center">
          <div className="mx-auto mb-2.5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary border border-primary/15">
            {config?.siteAvatar ? (
              <img src={config.siteAvatar} alt={siteTitle} className="h-full w-full rounded-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <h3 className="text-[13px] font-semibold text-on-surface">{siteTitle}</h3>
          <p className="mt-0.5 text-[11px] leading-relaxed text-on-surface-variant">{config?.siteDescription || '\u5206\u4eab\u6280\u672f\u3001\u5f00\u53d1\u4e0e\u751f\u6d3b'}</p>
          {(config?.socialLinks?.length || 0) > 0 && (
            <div className="mt-2.5 flex justify-center gap-1">
              {config!.socialLinks!.map((link: { name: string; url: string }) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[10px] text-primary border border-primary/10 hover:bg-primary/12 transition-colors duration-200 no-underline">
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* \u516c\u544a */}
      {config?.showAnnouncement && (
        <div className="glass-card-static p-4">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 text-primary">
              <Megaphone size={14} />
            </span>
            <div>
              <h3 className="text-[12px] font-semibold text-on-surface">{config?.announcementTitle || '\u516c\u544a'}</h3>
              <p className="mt-0.5 text-[11px] leading-relaxed text-on-surface-variant">{config?.announcementContent || ''}</p>
            </div>
          </div>
        </div>
      )}

      {/* \u7f6e\u9876\u6587\u7ae0 */}
      {pinnedPosts.length > 0 && (
        <div className="glass-card-static p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant">
            <Pin size={13} /> \u7f6e\u9876
          </h3>
          <ul className="space-y-0">
            {pinnedPosts.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex items-center rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-primary/5 no-underline">
                  <span className="text-[12px] text-on-surface group-hover:text-primary transition-colors duration-200 line-clamp-1">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* \u6700\u65b0\u6587\u7ae0 */}
      <div className="glass-card-static p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant">
          <Clock size={13} /> \u6700\u65b0\u6587\u7ae0
        </h3>
        <ul className="space-y-0">
          {recentPosts.map(post => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group flex items-center justify-between rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-primary/5 no-underline">
                <span className="text-[12px] text-on-surface group-hover:text-primary transition-colors duration-200 line-clamp-1 flex-1 min-w-0">{post.title}</span>
                <span className="text-[10px] text-on-surface-variant/70 ml-2 shrink-0">{new Date(post.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* \u6700\u65b0\u8bc4\u8bba */}
      {recentComments.length > 0 && (
        <div className="glass-card-static p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant">
            <MessageCircle size={13} /> \u6700\u65b0\u8bc4\u8bba
          </h3>
          <ul className="space-y-0">
            {recentComments.map(comment => (
              <li key={comment.id}>
                <Link href={`/blog/${comment.slug}`} className="group flex items-start gap-2 rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-primary/5 no-underline">
                  <img
                    src={comment.avatar}
                    alt={comment.nickname}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded-full border border-outline-variant/15 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-medium text-on-surface group-hover:text-primary transition-colors duration-200 truncate">{comment.nickname}</span>
                      <span className="text-[10px] text-on-surface-variant/60 shrink-0">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant line-clamp-1 leading-relaxed">{comment.content}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* \u65f6\u95f4\u8fdb\u5ea6\u6761 */}
      {config?.showTimeProgress !== false && <TimeProgress />}

      {/* \u65e5\u5386\u70ed\u529b\u56fe */}
      {config?.showCalendar !== false && <CalendarHeatmap posts={posts} />}

      {/* \u5206\u7c7b */}
      {categories.length > 0 && (
        <div className="glass-card-static p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant">
            <FolderOpen size={13} /> \u5206\u7c7b
          </h3>
          <div className="space-y-0">
            {categories.map(cat => (
              <Link key={cat} href={`/categories?name=${encodeURIComponent(cat)}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] text-on-surface transition-colors duration-200 hover:bg-primary/5 hover:text-primary no-underline">
                <span>{cat}</span>
                <span className="rounded-full bg-primary/8 px-1.5 py-px text-[10px] text-primary border border-primary/10">{posts.filter(p => p.category === cat).length}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* \u6807\u7b7e\u4e91 */}
      {tags.length > 0 && (
        <div className="glass-card-static p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant">
            <Tag size={13} /> \u6807\u7b7e\u4e91
          </h3>
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <Link key={tag} href={`/tags?name=${encodeURIComponent(tag)}`} className="tag-chip text-[10px] px-1.5 py-px no-underline">{tag}</Link>
            ))}
          </div>
        </div>
      )}

      {/* \u7ad9\u70b9\u7edf\u8ba1 */}
      {config?.showStats !== false && <BlogStats />}

      {/* \u5929\u6c14\u9884\u62a5 */}
      {config?.showWeather && config?.weatherCity && (
        <WeatherWidget city={config.weatherCity} />
      )}

      {/* \u6d3b\u52a8\u5012\u8ba1\u65f6 */}
      {config?.showEvents && config?.events && config.events.length > 0 && (
        <EventCountdown events={config.events} />
      )}

      {/* \u5f52\u6863 */}
      <div className="glass-card-static p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-on-surface-variant">
          <CalendarDays size={13} /> \u5f52\u6863
        </h3>
        <Link href="/archive" className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12px] text-on-surface transition-colors duration-200 hover:bg-primary/5 hover:text-primary no-underline">
          <span>\u6240\u6709\u6587\u7ae0</span>
          <span className="rounded-full bg-primary/8 px-1.5 py-px text-[10px] text-primary border border-primary/10">{posts.length}</span>
        </Link>
      </div>
    </aside>
  )
}
