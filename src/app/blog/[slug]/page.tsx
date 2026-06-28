import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: '未找到' }
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors no-underline"
      >
        <ArrowLeft size={16} />
        返回博客
      </Link>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
          <span className="rounded-full bg-primary-container px-3 py-0.5 text-xs font-medium text-on-primary-container">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          {post.updated && (
            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              更新于 {new Date(post.updated).toLocaleDateString('zh-CN')}
            </span>
          )}
        </div>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-on-surface md:text-4xl">
          {post.title}
        </h1>
        <p className="mb-4 text-lg text-on-surface-variant">{post.description}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link key={tag} href={`/tags?name=${encodeURIComponent(tag)}`} className="tag-chip no-underline">
                <Tag size={12} className="mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.image && (
        <div className="mb-8 overflow-hidden rounded-2xl">
          <img src={post.image} alt={post.title} className="h-auto w-full object-cover" />
        </div>
      )}

      <div className="prose">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      {/* 上一篇/下一篇 */}
      <div className="mt-12 grid grid-cols-2 gap-4 border-t border-outline-variant pt-6">
        <div>
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className="group no-underline">
              <span className="text-xs text-on-surface-variant">← 上一篇</span>
              <p className="mt-1 text-sm font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group no-underline">
              <span className="text-xs text-on-surface-variant">下一篇 →</span>
              <p className="mt-1 text-sm font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                {nextPost.title}
              </p>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
