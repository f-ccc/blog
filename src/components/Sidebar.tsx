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
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`
  if (diff < 2592000) return `${Math.floor(diff / 86400)} 天前`
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

  const siteTitle = config?.siteTitle || '我的博客'
  const initial = siteTitle.charAt(0)

  return (
    <aside className="space-y-4 stagger-children">
      {/* 个人资料 */}
      {config?.showProfile !== false && (
        <div className="glass-card-static p-5 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary border border-primary/20">
            {config?.siteAvatar ? (
              <img src={config.siteAvatar} alt={siteTitle} className="h-full w-full rounded-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <h3 className="text-[13px] font-semibold text-on-surface">{siteTitle}</h3>
          <p className="mt-1 text-[11px] text-on-surface-variant">{config?.siteDescription || '分享技术、开发与生活'}</p>
          {(config?.socialLinks?.length || 0) > 0 && (
            <div className="mt-3 flex justify-center gap-1.5">
              {config!.socialLinks!.map((link: { name: string; url: string }) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="rounded-full bg-primary/10 px-3 py-1 text-[11px] text-primary border border-primary/10 hover:bg-primary/15 transition-colors duration-300 no-underline">
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 公告 */}
      {config?.showAnnouncement && (
        <div className="glass-card-static p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-primary">
              <Megaphone size={16} />
            </span>
            <div>
              <h3 className="text-[13px] font-semibold text-on-surface">{config?.announcementTitle || '公告'}</h3>
              <p className="mt-1 text-[11px] text-on-surface-variant">{config?.announcementContent || ''}</p>
            </div>
          </div>
        </div>
      )}

      {/* 置顶文章 */}
      {pinnedPosts.length > 0 && (
        <div className="glass-card-static p-5">
          <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant">
            <Pin size={14} /> 置顶
          </h3>
          <ul className="space-y-0.5">
            {pinnedPosts.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-lg px-2 py-1.5 transition-colors duration-300 hover:bg-primary/6 no-underline">
                  <span className="text-[13px] font-medium text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-1">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 最新文章 */}
      <div className="glass-card-static p-5">
        <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant">
          <Clock size={14} /> 最新文章
        </h3>
        <ul className="space-y-0.5">
          {recentPosts.map(post => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-lg px-2 py-1.5 transition-colors duration-300 hover:bg-primary/6 no-underline">
                <span className="text-[13px] font-medium text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-1">{post.title}</span>
                <span className="text-[11px] text-on-surface-variant">{new Date(post.date).toLocaleDateString('zh-CN')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 最新评论 */}
      {recentComments.length > 0 && (
        <div className="glass-card-static p-5">
          <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant">
            <MessageCircle size={14} /> 最新评论
          </h3>
          <ul className="space-y-0.5">
            {recentComments.map(comment => (
              <li key={comment.id}>
                <Link href={`/blog/${comment.slug}`} className="group flex items-start gap-2.5 rounded-lg px-2 py-1.5 transition-colors duration-300 hover:bg-primary/6 no-underline">
                  <img
                    src={comment.avatar}
                    alt={comment.nickname}
                    className="mt-0.5 h-6 w-6 shrink-0 rounded-full border border-outline-variant/20 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-medium text-on-surface group-hover:text-primary transition-colors duration-300 truncate">{comment.nickname}</span>
                      <span className="text-[11px] text-on-surface-variant shrink-0">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">{comment.content}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 时间进度条 */}
      {config?.showTimeProgress !== false && <TimeProgress />}

      {/* 日历热力图 */}
      {config?.showCalendar !== false && <CalendarHeatmap posts={posts} />}

      {/* 分类 */}
      {categories.length > 0 && (
        <div className="glass-card-static p-5">
          <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant">
            <FolderOpen size={14} /> 分类
          </h3>
          <div className="space-y-0.5">
            {categories.map(cat => (
              <Link key={cat} href={`/categories?name=${encodeURIComponent(cat)}`}
                className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] text-on-surface transition-colors duration-300 hover:bg-primary/6 hover:text-primary no-underline">
                <span>{cat}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] text-primary border border-primary/10">{posts.filter(p => p.category === cat).length}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 标签云 */}
      {tags.length > 0 && (
        <div className="glass-card-static p-5">
          <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant">
            <Tag size={14} /> 标签云
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <Link key={tag} href={`/tags?name=${encodeURIComponent(tag)}`} className="tag-chip text-[11px] no-underline">{tag}</Link>
            ))}
          </div>
        </div>
      )}

      {/* 站点统计 */}
      {config?.showStats !== false && <BlogStats />}

      {/* 天气预报 */}
      {config?.showWeather && config?.weatherCity && (
        <WeatherWidget city={config.weatherCity} />
      )}

      {/* 活动倒计时 */}
      {config?.showEvents && config?.events && config.events.length > 0 && (
        <EventCountdown events={config.events} />
      )}

      {/* 归档 */}
      <div className="glass-card-static p-5">
        <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant">
          <CalendarDays size={14} /> 归档
        </h3>
        <Link href="/archive" className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] text-on-surface transition-colors duration-300 hover:bg-primary/6 hover:text-primary no-underline">
          <span>所有文章</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] text-primary border border-primary/10">{posts.length}</span>
        </Link>
      </div>
    </aside>
  )
}
