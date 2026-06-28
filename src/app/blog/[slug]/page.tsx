import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
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
  if (!post) return { title: 'Not Found' }
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {/* Back link */}
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary transition-colors no-underline"
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
          <span className="rounded-full bg-primary-container px-3 py-0.5 text-xs font-medium text-on-primary-container">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-on-surface md:text-4xl">
          {post.title}
        </h1>

        <p className="mb-4 text-lg text-on-surface-variant">
          {post.description}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="tag-chip">
                <Tag size={12} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {post.image && (
        <div className="mb-8 overflow-hidden rounded-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-outline-variant pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all no-underline"
        >
          <ArrowLeft size={16} />
          Back to all posts
        </Link>
      </footer>
    </article>
  )
}
