'use client'

import Link from 'next/link'
import { Tag, FolderOpen, Clock, CalendarDays } from 'lucide-react'
import type { Post } from '@/lib/types'
import { useConfig } from '@/hooks/useConfig'
import TimeProgress from './widgets/TimeProgress'
import CalendarHeatmap from './widgets/CalendarHeatmap'
import BlogStats from './widgets/BlogStats'
import WeatherWidget from './widgets/WeatherWidget'
import EventCountdown from './widgets/EventCountdown'

export default function Sidebar({
  posts,
  tags,
  categories,
}: {
  posts: Post[]
  tags: string[]
  categories: string[]
}) {
  const { config } = useConfig()
  const recentPosts = posts.slice(0, 6)
  const pinnedPosts = posts.filter(p => p.pinned).slice(0, 3)

  const siteTitle = config?.siteTitle || '我的博客'
  const initial = siteTitle.charAt(0)

  return (
    <aside className="space-y-5 stagger-children">
      {/* 个人资料 */}
      {config?.showProfile !== false && (
        <div className="glass-card-static p-5 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary border-2 border-primary/20">
            {config?.siteAvatar ? (
              <img src={config.siteAvatar} alt={siteTitle} className="h-full w-full rounded-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <h3 className="text-base font-semibold text-on-surface">{siteTitle}</h3>
          <p className="mt-1 text-xs text-on-surface-variant">{config?.siteDescription || '分享技术、开发与生活'}</p>
          {(config?.socialLinks?.length || 0) > 0 && (
            <div className="mt-3 flex justify-center gap-2">
              {config!.socialLinks!.map((link: { name: string; url: string }) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="rounded-lg bg-primary/8 px-3 py-1 text-xs text-primary border border-primary/15 hover:bg-primary/15 transition-colors no-underline">
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
            <span className="text-lg">
              {config?.announcementType === 'warning' ? '⚠️' : config?.announcementType === 'success' ? '🎉' : '💡'}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-on-surface">{config?.announcementTitle || '公告'}</h3>
              <p className="mt-1 text-xs text-on-surface-variant">{config?.announcementContent || ''}</p>
            </div>
          </div>
        </div>
      )}

      {/* 置顶文章 */}
      {pinnedPosts.length > 0 && (
        <div className="glass-card-static p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
            📌 置顶
          </h3>
          <ul className="space-y-1">
            {pinnedPosts.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-xl p-2 transition-colors hover:bg-primary/8 no-underline">
                  <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-1">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 最新文章 */}
      <div className="glass-card-static p-5">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
          <Clock size={16} /> 最新文章
        </h3>
        <ul className="space-y-1">
          {recentPosts.map(post => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-xl p-2 transition-colors hover:bg-primary/8 no-underline">
                <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-1">{post.title}</span>
                <span className="text-xs text-on-surface-variant">{new Date(post.date).toLocaleDateString('zh-CN')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 时间进度条 */}
      {config?.showTimeProgress !== false && <TimeProgress />}

      {/* 日历热力图 */}
      {config?.showCalendar !== false && <CalendarHeatmap posts={posts} />}

      {/* 分类 */}
      {categories.length > 0 && (
        <div className="glass-card-static p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
            <FolderOpen size={16} /> 分类
          </h3>
          <div className="space-y-1">
            {categories.map(cat => (
              <Link key={cat} href={`/categories?name=${encodeURIComponent(cat)}`}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-primary/8 hover:text-on-surface no-underline">
                <span>{cat}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary border border-primary/15">{posts.filter(p => p.category === cat).length}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 标签云 */}
      {tags.length > 0 && (
        <div className="glass-card-static p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
            <Tag size={16} /> 标签云
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Link key={tag} href={`/tags?name=${encodeURIComponent(tag)}`} className="tag-chip text-xs no-underline">{tag}</Link>
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
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-on-surface-variant">
          <CalendarDays size={16} /> 归档
        </h3>
        <Link href="/archive" className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-primary/8 hover:text-on-surface no-underline">
          <span>所有文章</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary border border-primary/15">{posts.length}</span>
        </Link>
      </div>
    </aside>
  )
}
