'use client'

import { useEffect, useState } from 'react'

export default function TimeProgress() {
  const [progress, setProgress] = useState({ year: 0, month: 0, week: 0, day: 0 })

  useEffect(() => {
    const calc = () => {
      const now = new Date()
      
      // Year progress
      const startOfYear = new Date(now.getFullYear(), 0, 1)
      const endOfYear = new Date(now.getFullYear() + 1, 0, 1)
      const year = ((now.getTime() - startOfYear.getTime()) / (endOfYear.getTime() - startOfYear.getTime())) * 100

      // Month progress
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const month = ((now.getTime() - startOfMonth.getTime()) / (endOfMonth.getTime() - startOfMonth.getTime())) * 100

      // Week progress
      const dayOfWeek = now.getDay() || 7
      const week = ((dayOfWeek - 1) / 7) * 100

      // Day progress
      const day = ((now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 86400) * 100

      setProgress({ year, month, week, day })
    }

    calc()
    const timer = setInterval(calc, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-2xl border border-outline-variant bg-surface p-5">
      <h3 className="mb-3 text-sm font-semibold text-on-surface-variant">⏱ 时间进度</h3>
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
      <div className="mb-1 flex justify-between text-xs text-on-surface-variant">
        <span>{label}</span>
        <span>{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-container-high">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  )
}
