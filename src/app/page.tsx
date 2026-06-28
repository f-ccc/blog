import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()
  const pinnedPosts = posts.filter(p => p.pinned)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Hero */}
      <section className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-container text-3xl font-bold text-on-primary-container">
          B
        </div>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-on-surface md:text-5xl">
          我的博客
        </h1>
        <p className="mx-auto max-w-lg text-base text-on-surface-variant">
          分享技术、开发和生活的个人博客
        </p>
      </section>

      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-on-surface">
            📌 置顶文章
          </h2>
          <div className="space-y-4">
            {pinnedPosts.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">最新文章</h2>
            <span className="text-sm text-on-surface-variant">共 {posts.length} 篇</span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-outline-variant bg-surface p-12 text-center">
              <p className="text-lg text-on-surface-variant">暂无文章</p>
              <p className="mt-1 text-sm text-on-surface-variant">
                在 src/content/posts/ 目录下创建你的第一篇文章
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {posts.slice(0, 10).map(post => (
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
