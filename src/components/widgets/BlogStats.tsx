'use client'

import { useEffect, useState } from 'react'
import { BarChart3 } from 'lucide-react'

interface Stats {
  totalPosts: number
  totalCategories: number
  totalTags: number
  totalWords: number
  daysRunning: number
}

export default function BlogStats() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(() => {})
  }, [])

  if (!stats) return null

  return (
    <div className="glass-card-static p-5">
      <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant"><BarChart3 size={14} /> 站点统计</h3>
      <div className="grid grid-cols-2 gap-2">
        <StatItem label="文章" value={stats.totalPosts} />
        <StatItem label="分类" value={stats.totalCategories} />
        <StatItem label="标签" value={stats.totalTags} />
        <StatItem label="字数" value={stats.totalWords > 10000 ? `${(stats.totalWords / 10000).toFixed(1)}w` : stats.totalWords} />
        <div className="col-span-2 mt-1 rounded-xl bg-surface-container-high p-2 text-center">
          <span className="text-[11px] text-on-surface-variant">已运行 </span>
          <span className="text-base font-bold text-primary">{stats.daysRunning}</span>
          <span className="text-[11px] text-on-surface-variant"> 天</span>
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-surface-container-high p-2 text-center">
      <p className="text-base font-bold text-on-surface">{value}</p>
      <p className="text-[10px] text-on-surface-variant">{label}</p>
    </div>
  )
}
