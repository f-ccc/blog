import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { getReadingTime } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import CommentSection from '@/components/CommentSection'
import ReadingProgress from '@/components/ReadingProgress'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const post = getPostBySlug(decodedSlug)
  if (!post) return { title: '未找到' }
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const readTime = getReadingTime(post.content)

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-4 py-6">
      <Link
        href="/blog"
        className="mb-4 inline-flex items-center gap-1 text-[12px] text-on-surface-variant hover:text-primary transition-colors duration-300 no-underline"
      >
        <ArrowLeft size={13} />
        返回博客
      </Link>

      <header className="mb-6">
        <div className="mb-2.5 flex flex-wrap items-center gap-2.5 text-[11px] text-on-surface-variant">
          <span className="rounded-full bg-primary-container px-2 py-0.5 text-[10px] font-medium text-on-primary-container">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={12} />
            {new Date(post.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            约 {readTime} 分钟
          </span>
          {post.updated && (
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              更新于 {new Date(post.updated).toLocaleDateString('zh-CN')}
            </span>
          )}
        </div>

        <h1 className="mb-3 text-xl font-bold leading-tight tracking-tight text-on-surface md:text-2xl">
          {post.title}
        </h1>
        <p className="mb-3 text-[12px] text-on-surface-variant">{post.description}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
              <Link key={tag} href={`/tags?name=${encodeURIComponent(tag)}`} className="tag-chip text-[10px] no-underline">
                <Tag size={10} className="mr-0.5" />
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.image && (
        <div className="mb-6 overflow-hidden rounded-lg">
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
      <div className="mt-10 grid grid-cols-2 gap-3 border-t border-outline-variant/30 pt-4">
        <div>
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className="group no-underline">
              <span className="text-[11px] text-on-surface-variant">← 上一篇</span>
              <p className="mt-0.5 text-[12px] font-medium text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group no-underline">
              <span className="text-[11px] text-on-surface-variant">下一篇 →</span>
              <p className="mt-0.5 text-[12px] font-medium text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {nextPost.title}
              </p>
            </Link>
          )}
        </div>
      </div>

      {/* 评论区 */}
      {post.comment !== false && <CommentSection slug={slug} />}
    </article>
    </>
  )
}
