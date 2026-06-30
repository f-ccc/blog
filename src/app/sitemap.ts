import { getAllPosts } from '@/lib/posts'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const siteUrl = 'https://hjw.fccc.xyz'

  const staticPages = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${siteUrl}/archive`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${siteUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${siteUrl}/tags`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${siteUrl}/friends`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${siteUrl}/guestbook`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.4 },
  ]

  const postPages = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...postPages]
}
