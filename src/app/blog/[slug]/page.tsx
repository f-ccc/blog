import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
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
        className="mb-6 inline-flex items-center gap-1 text-[13px] text-on-surface-variant hover:text-primary transition-colors duration-300 no-underline"
      >
        <ArrowLeft size={14} />
        返回博客
      </Link>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-[13px] text-on-surface-variant">
          <span className="rounded-full bg-primary-container px-3 py-0.5 text-[11px] font-medium text-on-primary-container">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={13} />
            {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          {post.updated && (
            <span className="inline-flex items-center gap-1">
              <Clock size={13} />
              更新于 {new Date(post.updated).toLocaleDateString('zh-CN')}
            </span>
          )}
        </div>

        <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-on-surface md:text-3xl">
          {post.title}
        </h1>
        <p className="mb-4 text-[13px] text-on-surface-variant">{post.description}</p>

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
      <div className="mt-12 grid grid-cols-2 gap-4 border-t border-outline-variant/30 pt-5">
        <div>
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className="group no-underline">
              <span className="text-[11px] text-on-surface-variant">← 上一篇</span>
              <p className="mt-1 text-[13px] font-medium text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group no-underline">
              <span className="text-[11px] text-on-surface-variant">下一篇 →</span>
              <p className="mt-1 text-[13px] font-medium text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {nextPost.title}
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* 评论区占位（可接入 Waline / Giscus / Twikoo） */}
      <div className="mt-8 glass-card-static p-5">
        <h3 className="mb-4 text-base font-semibold text-on-surface">💬 评论</h3>
        <div className="rounded-xl bg-surface-container-high p-6 text-center">
          <p className="text-[13px] text-on-surface-variant">
            评论功能待接入 —— 支持 Waline / Giscus / Twikoo 等主流评论系统
          </p>
          <p className="mt-1 text-[11px] text-on-surface-variant">
            在 <code className="rounded bg-surface-container px-1 text-[11px]">src/components/CommentSection.tsx</code> 中配置你的评论服务
          </p>
        </div>
      </div>
    </article>
  )
}
