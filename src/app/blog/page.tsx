import { getAllPosts } from '@/lib/posts'
import { getRecentComments } from '@/lib/comments'
import type { Metadata } from 'next'
import BlogListPage from './BlogListPage'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '博客',
  description: '所有博客文章列表',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const recentComments = getRecentComments(5)
  return <BlogListPage posts={posts} recentComments={recentComments} />
}
