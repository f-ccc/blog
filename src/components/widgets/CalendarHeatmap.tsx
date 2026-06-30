'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/types'

export default function CalendarHeatmap({ posts }: { posts: Post[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const postDates = new Set(posts.map(p => new Date(p.date).toDateString()))

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthNames = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']

  const postsByDay = posts.filter(p => {
    const d = new Date(p.date)
    return d.getMonth() === month && d.getFullYear() === year
  })

  return (
    <div className="glass-card-static p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-on-surface-variant">📅 日历</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">←</button>
          <span className="text-xs font-medium text-on-surface">{monthNames[month]} {year}</span>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">→</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {['日','一','二','三','四','五','六'].map(d => (
          <div key={d} className="py-1 text-[10px] font-medium text-on-surface-variant">{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const date = new Date(year, month, day)
          const hasPost = postDates.has(date.toDateString())
          const dayPosts = postsByDay.filter(p => new Date(p.date).getDate() === day)
          return (
            <div key={day} className="relative group">
              {hasPost ? (
                <div className="flex items-center justify-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-container text-[11px] font-medium text-on-primary-container cursor-pointer">
                    {day}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
                    <div className="rounded-lg bg-on-surface px-2 py-1 text-[10px] text-surface whitespace-nowrap shadow-lg">
                      {dayPosts.map(p => p.title).join(' · ')}
                    </div>
                  </div>
                </div>
              ) : (
                <span className="flex h-7 w-7 items-center justify-center text-[11px] text-on-surface-variant">{day}</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Posts this month */}
      {postsByDay.length > 0 && (
        <div className="mt-3 space-y-1">
          {postsByDay.slice(0, 3).map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="flex items-center gap-2 rounded-xl px-2 py-1 text-xs text-on-surface-variant hover:bg-primary/8 transition-colors no-underline">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="line-clamp-1">{post.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
