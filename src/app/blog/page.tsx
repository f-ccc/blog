import { getAllPosts } from '@/lib/posts'
import type { Metadata } from 'next'
import BlogListPage from './BlogListPage'

export const metadata: Metadata = {
  title: '博客',
  description: '所有博客文章列表',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogListPage posts={posts} />
}
