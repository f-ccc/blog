'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

export default function FcSettingsPage() {
  const [config, setConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data)
        setLoading(false)
      })
  }, [])

  const update = (key: string, value: any) => {
    setConfig({ ...config, [key]: value })
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    const res = await fetch('/api/fc/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    })
    if (res.ok) {
      setMessage('保存成功')
    } else {
      setMessage('保存失败')
    }
    setSaving(false)
  }

  if (loading) return <div className="py-12 text-center text-on-surface-variant">加载中...</div>
  if (!config) return <div className="py-12 text-center text-on-surface-variant">加载失败</div>

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">站点设置</h1>
          <p className="text-sm text-on-surface-variant">管理博客全局配置</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer">
          <Save size={16} />{saving ? '保存中...' : '保存'}
        </button>
      </div>

      {message && <div className="mb-4 rounded-xl bg-primary-container px-4 py-2 text-sm text-on-primary-container">{message}</div>}

      <div className="space-y-6">
        {/* 基本设置 */}
        <Section title="基本设置">
          <Field label="站点标题">
            <input value={config.siteTitle} onChange={e => update('siteTitle', e.target.value)}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2 text-sm" />
          </Field>
          <Field label="站点描述">
            <input value={config.siteDescription} onChange={e => update('siteDescription', e.target.value)}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2 text-sm" />
          </Field>
        </Section>

        {/* 主题设置 */}
        <Section title="主题设置">
          <Field label="主题色相 (Hue 0-360)">
            <div className="flex items-center gap-3">
              <input type="range" min="0" max="360" value={config.themeHue} onChange={e => update('themeHue', parseInt(e.target.value))}
                className="flex-1 accent-primary" />
              <span className="w-12 text-sm text-on-surface">{config.themeHue}°</span>
            </div>
          </Field>
          <Field label="壁纸模式">
            <select value={config.wallpaperMode} onChange={e => update('wallpaperMode', e.target.value)}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2 text-sm">
              <option value="banner">横幅壁纸</option>
              <option value="fullscreen">全屏壁纸</option>
              <option value="transparent">全屏透明</option>
              <option value="solid">纯色背景</option>
            </select>
          </Field>
          <Field label="卡片透明度 (%)">
            <input type="number" min="0" max="100" value={config.cardOpacity} onChange={e => update('cardOpacity', parseInt(e.target.value))}
              className="w-24 rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2 text-sm" />
          </Field>
        </Section>

        {/* 特效 */}
        <Section title="特效开关">
          <ToggleField label="🌸 樱花飘落" checked={config.sakuraEnabled} onChange={v => update('sakuraEnabled', v)} />
          {config.sakuraEnabled && (
            <Field label="樱花数量">
              <input type="number" min="10" max="200" value={config.sakuraCount} onChange={e => update('sakuraCount', parseInt(e.target.value))}
                className="w-24 rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2 text-sm" />
            </Field>
          )}
          <ToggleField label="🌊 水波纹" checked={config.waveEnabled} onChange={v => update('waveEnabled', v)} />
        </Section>

        {/* 侧边栏组件 */}
        <Section title="侧边栏组件开关">
          <ToggleField label="时间进度条" checked={config.showTimeProgress} onChange={v => update('showTimeProgress', v)} />
          <ToggleField label="日历热力图" checked={config.showCalendar} onChange={v => update('showCalendar', v)} />
          <ToggleField label="站点统计" checked={config.showStats} onChange={v => update('showStats', v)} />
          <ToggleField label="天气预报" checked={config.showWeather} onChange={v => update('showWeather', v)} />
          <ToggleField label="活动倒计时" checked={config.showEvents} onChange={v => update('showEvents', v)} />
          <ToggleField label="音乐播放器" checked={config.showMusicPlayer} onChange={v => update('showMusicPlayer', v)} />
        </Section>

        {/* 站点运行时间 */}
        <Section title="站点运行时间">
          <Field label="开始日期">
            <input type="date" value={config.siteStartDate} onChange={e => update('siteStartDate', e.target.value)}
              className="rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2 text-sm" />
          </Field>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-outline-variant bg-surface p-6">
      <h2 className="mb-4 text-base font-semibold text-on-surface">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-on-surface">{label}</label>
      {children}
    </div>
  )
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-on-surface">{label}</span>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-outline-variant accent-primary" />
    </label>
  )
}
