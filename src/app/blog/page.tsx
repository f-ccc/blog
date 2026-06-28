import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import Sidebar from '@/components/Sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'All blog posts',
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; category?: string }>
}) {
  const allPosts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()

  // This is a client-side feature; for simplicity, we show all posts
  // Filtering by tag/category is handled via URL params
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-on-surface">Blog</h1>
        <p className="mt-1 text-on-surface-variant">All articles and posts</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          <div className="space-y-5">
            {allPosts.length === 0 ? (
              <div className="rounded-2xl border border-outline-variant bg-surface p-12 text-center">
                <p className="text-lg text-on-surface-variant">No posts yet</p>
              </div>
            ) : (
              allPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))
            )}
          </div>
        </div>

        <div className="w-full shrink-0 lg:w-80">
          <Sidebar posts={allPosts} tags={tags} categories={categories} />
        </div>
      </div>
    </div>
  )
}
