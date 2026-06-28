import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Hero Section */}
      <section className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-on-surface md:text-5xl">
          Welcome to My Blog
        </h1>
        <p className="mx-auto max-w-lg text-base text-on-surface-variant">
          Sharing thoughts on technology, development, and life. 
          Built with Next.js, inspired by Firefly&apos;s Material Design 3.
        </p>
      </section>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-on-surface">
              Latest Posts
            </h2>
            <span className="text-sm text-on-surface-variant">
              {posts.length} posts
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="rounded-2xl border border-outline-variant bg-surface p-12 text-center">
              <p className="text-lg text-on-surface-variant">No posts yet</p>
              <p className="mt-1 text-sm text-on-surface-variant">
                Create your first post in src/content/posts/
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {posts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full shrink-0 lg:w-80">
          <Sidebar posts={posts} tags={tags} categories={categories} />
        </div>
      </div>
    </div>
  )
}
