'use client'

import { useEffect, useState } from 'react'

interface WeatherData {
  temperature: number
  weather: string
  humidity: number
  windPower: string
  aqi: number
  pm25: number
}

export default function WeatherWidget({ city }: { city: string }) {
  const [mounted, setMounted] = useState(false)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true) // 🎯 水合完成后再执行客户端逻辑
    if (!city) { setLoading(false); return }
    setWeather({
      temperature: 28,
      weather: '晴',
      humidity: 65,
      windPower: '3级',
      aqi: 55,
      pm25: 35,
    })
    setLoading(false)
  }, [city])

  // 🎯 水合前渲染结构完全一致的骨架屏
  if (!mounted) {
    return (
      <div className="glass-card-static p-5">
        <h3 className="mb-3 text-sm font-semibold text-on-surface-variant">🌤 天气</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-9 w-16 animate-pulse rounded bg-surface-container-high" />
            <div className="h-4 w-10 animate-pulse rounded bg-surface-container-high" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-14 animate-pulse rounded-lg bg-surface-container-high" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (loading) return null

  return (
    <div className="glass-card-static p-5">
      <h3 className="mb-3 text-sm font-semibold text-on-surface-variant">🌤 天气</h3>
      {weather ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-on-surface">{weather.temperature}°</span>
            <span className="text-sm text-on-surface-variant">{weather.weather}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-surface-container-high p-2">
              <span className="text-on-surface-variant">湿度</span>
              <p className="font-medium text-on-surface">{weather.humidity}%</p>
            </div>
            <div className="rounded-lg bg-surface-container-high p-2">
              <span className="text-on-surface-variant">风力</span>
              <p className="font-medium text-on-surface">{weather.windPower}</p>
            </div>
            <div className="rounded-lg bg-surface-container-high p-2">
              <span className="text-on-surface-variant">AQI</span>
              <p className="font-medium text-on-surface">{weather.aqi}</p>
            </div>
            <div className="rounded-lg bg-surface-container-high p-2">
              <span className="text-on-surface-variant">PM2.5</span>
              <p className="font-medium text-on-surface">{weather.pm25}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-on-surface-variant">未配置城市</p>
      )}
    </div>
  )
}
