import type { Metadata } from 'next'
import { getConfig } from '@/lib/config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '关于',
  description: '关于我和这个博客',
}

export default function AboutPage() {
  const config = getConfig()

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">关于</h1>
        <p className="mt-1 text-[13px] text-on-surface-variant">关于我和这个博客</p>
      </div>

      <div className="glass-card-static p-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {config.siteName?.charAt(0) || 'B'}
          </div>
          <div>
            <h2 className="text-base font-semibold text-on-surface">{config.siteName || config.siteTitle || '我的博客'}</h2>
            <p className="text-[13px] text-on-surface-variant">{config.siteDescription || ''}</p>
          </div>
        </div>

        <div className="prose">
          <h2>关于这个博客</h2>
          <p>
            这个博客使用 <strong>Next.js</strong> 全栈框架构建，界面设计借鉴了 
            <a href="https://github.com/CuteLeaf/Firefly" target="_blank" rel="noopener noreferrer">Firefly</a> 
            的 Material Design 3 风格。
          </p>

          <h2>技术栈</h2>
          <ul>
            <li><strong>Next.js 16</strong> - React 全栈框架</li>
            <li><strong>TypeScript</strong> - 类型安全</li>
            <li><strong>Tailwind CSS v4</strong> - 样式框架</li>
            <li><strong>MDX</strong> - Markdown 文章渲染</li>
          </ul>

          <h2>功能特性</h2>
          <ul>
            <li>✨ Material Design 3 设计风格</li>
            <li>🌙 亮色/暗色模式切换</li>
            <li>📝 Markdown/MDX 文章支持</li>
            <li>🏷️ 标签和分类管理</li>
            <li>🔍 全文搜索</li>
            <li>📱 响应式设计</li>
            <li>📊 管理后台</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
