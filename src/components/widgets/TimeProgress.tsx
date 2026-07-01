'use client'

import { useEffect, useState } from 'react'
import { Timer } from 'lucide-react'

export default function TimeProgress() {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState({ year: 0, month: 0, week: 0, day: 0 })

  useEffect(() => {
    setMounted(true) // 🎯 水合完成后再渲染真实内容

    const calc = () => {
      const now = new Date()
      const startOfYear = new Date(now.getFullYear(), 0, 1)
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1)
      const year = ((now.getTime() - startOfYear.getTime()) / (endOfYear.getTime() - startOfYear.getTime())) * 100

      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const month = ((now.getTime() - startOfMonth.getTime()) / (endOfMonth.getTime() - startOfMonth.getTime())) * 100

      const dayOfWeek = now.getDay() || 7
      const week = ((dayOfWeek - 1) / 7) * 100

      const day = ((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400) * 100

      setProgress({ year, month, week, day })
    }

    calc()
    const timer = setInterval(calc, 60000)
    return () => clearInterval(timer)
  }, [])

  // 🎯 水合前渲染骨架屏，结构完全一致但无动态数据
  if (!mounted) {
    return (
      <div className="glass-card-static p-5">
        <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant"><Timer size={14} /> 时间进度</h3>
        <div className="space-y-2.5">
          <SkeletonBar />
          <SkeletonBar />
          <SkeletonBar />
          <SkeletonBar />
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card-static p-5">
      <h3 className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant"><Timer size={14} /> 时间进度</h3>
      <div className="space-y-2.5">
        <ProgressBar label="本年" value={progress.year} color="bg-primary" />
        <ProgressBar label="本月" value={progress.month} color="bg-secondary" />
        <ProgressBar label="本周" value={progress.week} color="bg-tertiary" />
        <ProgressBar label="今日" value={progress.day} color="bg-[#4ddbdb]" />
      </div>
    </div>
  )
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] text-on-surface-variant">
        <span>{label}</span>
        <span>{value.toFixed(1)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  )
}

function SkeletonBar() {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] text-on-surface-variant">
        <span className="h-2.5 w-8 rounded bg-surface-container-high" />
        <span className="h-2.5 w-10 rounded bg-surface-container-high" />
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
        <div className="h-full w-0 rounded-full" />
      </div>
    </div>
  )
}
