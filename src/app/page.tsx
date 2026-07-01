import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import { getConfig } from '@/lib/config'
import BlogCard from '@/components/BlogCard'
import Sidebar from '@/components/Sidebar'
import { Pin, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function Home() {
  const config = getConfig()
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()
  const pinnedPosts = posts.filter(p => p.pinned)
  const initial = (config.siteTitle || '我的博客').charAt(0)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Hero */}
      <section className="mb-12 text-center animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary border border-primary/20 shadow-sm shadow-primary/10 backdrop-blur-sm">
          {config.siteAvatar ? (
            <img src={config.siteAvatar} alt={initial} className="h-full w-full rounded-full object-cover" />
          ) : (
            initial
          )}
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
          <span className="bg-gradient-to-r from-on-surface via-primary to-secondary bg-clip-text text-transparent">{config.siteTitle || '我的博客'}</span>
        </h1>
        <p className="mx-auto max-w-lg text-base text-on-surface-variant leading-relaxed">
          {config.siteDescription || '分享技术、开发和生活的个人博客'}
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-4 py-1.5 text-[11px] font-medium text-primary border border-primary/15">
            {posts.length} 篇文章
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/8 px-4 py-1.5 text-[11px] font-medium text-secondary border border-secondary/15">
            {categories.length} 个分类
          </span>
        </div>
      </section>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-on-surface animate-fade-in-up">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10"><Pin size={14} className="text-primary" /></span>
            置顶文章
          </h2>
          <div className="space-y-4 stagger-children">
            {pinnedPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between animate-fade-in-up">
            <h2 className="text-base font-semibold text-on-surface flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10"><FileText size={14} className="text-primary" /></span>
              最新文章
            </h2>
            <span className="text-sm text-on-surface-variant bg-surface-container/50 px-3 py-1 rounded-full border border-outline-variant/30">共 {posts.length} 篇</span>
          </div>

          {posts.length === 0 ? (
            <div className="glass-card-static p-12 text-center">
              <p className="text-lg text-on-surface-variant">暂无文章</p>
              <p className="mt-1 text-sm text-on-surface-variant">
                在 src/content/posts/ 目录下创建你的第一篇文章
              </p>
            </div>
          ) : (
            <div className="space-y-4 stagger-children">
              {posts.filter(p => !p.pinned).slice(0, 10).map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        <div className="w-full shrink-0 lg:w-80">
          <Sidebar posts={posts} tags={tags} categories={categories} />
        </div>
      </div>
    </div>
  )
}
