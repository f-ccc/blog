import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { FileText, Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Blog admin dashboard',
}

export default function AdminPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Admin</h1>
          <p className="mt-1 text-on-surface-variant">Manage your blog content</p>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:opacity-90 transition-opacity no-underline"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
              <FileText size={20} className="text-on-primary-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">{posts.length}</p>
              <p className="text-xs text-on-surface-variant">Total Posts</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-container">
              <FileText size={20} className="text-on-secondary-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">
                {posts.filter(p => p.pinned).length}
              </p>
              <p className="text-xs text-on-surface-variant">Pinned</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-outline-variant bg-surface p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-container">
              <FileText size={20} className="text-on-tertiary-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-on-surface">
                {new Set(posts.map(p => p.category)).size}
              </p>
              <p className="text-xs text-on-surface-variant">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl border border-outline-variant bg-surface overflow-hidden">
        <div className="border-b border-outline-variant px-6 py-4">
          <h2 className="text-base font-semibold text-on-surface">All Posts</h2>
        </div>
        {posts.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-on-surface-variant">No posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {posts.map(post => (
              <div key={post.slug} className="flex items-center justify-between px-6 py-4">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="font-medium text-on-surface hover:text-primary transition-colors no-underline"
                  >
                    {post.title}
                  </Link>
                  <div className="mt-1 flex items-center gap-3 text-xs text-on-surface-variant">
                    <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                    <span>{post.category}</span>
                    {post.pinned && <span className="text-tertiary">📌 Pinned</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors no-underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="rounded-lg bg-surface-container-high px-3 py-1.5 text-xs font-medium text-on-surface hover:bg-surface-container-highest transition-colors no-underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How to create posts */}
      <div className="mt-8 rounded-2xl border border-outline-variant bg-surface p-6">
        <h2 className="mb-3 text-base font-semibold text-on-surface">How to Create Posts</h2>
        <p className="mb-2 text-sm text-on-surface-variant">
          Create markdown files in <code className="rounded bg-surface-container-high px-1.5 py-0.5 text-xs">src/content/posts/</code> directory.
        </p>
        <p className="text-sm text-on-surface-variant">
          Each file needs frontmatter with title, date, description, tags, etc.
        </p>
      </div>
    </div>
  )
}
