import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  tags: string[]
  category: string
  published: boolean
  pinned: boolean
  image?: string
  content: string
  lang?: string
  comment?: boolean
}

export interface SiteConfig {
  title: string
  description: string
  lang: string
  avatar: string
  name: string
  social: { name: string; url: string; icon: string }[]
}

export const defaultSiteConfig: SiteConfig = {
  title: 'My Blog',
  description: '分享技术、开发和生活的个人博客',
  lang: 'zh-CN',
  avatar: '/avatar.jpg',
  name: '博主',
  social: [
    { name: 'GitHub', url: 'https://github.com/f-ccc', icon: 'github' },
  ],
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts')
const configPath = path.join(process.cwd(), 'src/content/config.json')

export function getSiteConfig(): SiteConfig {
  try {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, 'utf8')
      return { ...defaultSiteConfig, ...JSON.parse(data) }
    }
  } catch {}
  return defaultSiteConfig
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.(md|mdx)$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        updated: data.updated ? new Date(data.updated).toISOString() : undefined,
        tags: data.tags || [],
        category: data.category || '默认',
        published: data.published !== false,
        pinned: data.pinned || false,
        image: data.image || null,
        content,
        lang: data.lang || 'zh-CN',
        comment: data.comment !== false,
      } as Post
    })

  return allPosts
    .filter(post => post.published)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach(post => post.tags?.forEach(tag => tags.add(tag)))
  return Array.from(tags).sort()
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  posts.forEach(post => {
    if (post.category) categories.add(post.category)
  })
  return Array.from(categories).sort()
}

export function getArchiveData(): { year: number; months: { month: number; posts: Post[] }[] }[] {
  const posts = getAllPosts()
  const archiveMap = new Map<number, Map<number, Post[]>>()

  posts.forEach(post => {
    const d = new Date(post.date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    if (!archiveMap.has(year)) archiveMap.set(year, new Map())
    const yearMap = archiveMap.get(year)!
    if (!yearMap.has(month)) yearMap.set(month, [])
    yearMap.get(month)!.push(post)
  })

  return Array.from(archiveMap.entries())
    .sort(([a], [b]) => b - a)
    .map(([year, months]) => ({
      year,
      months: Array.from(months.entries())
        .sort(([a], [b]) => b - a)
        .map(([month, posts]) => ({ month, posts })),
    }))
}

export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase()
  return getAllPosts().filter(
    post =>
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some(t => t.toLowerCase().includes(q)) ||
      post.category.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
  )
}

export function createPost(data: Partial<Post> & { content: string }): Post {
  const slug = data.slug || data.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '') || `post-${Date.now()}`
  const filePath = path.join(postsDirectory, `${slug}.md`)
  
  const frontmatter = {
    title: data.title || '未命名文章',
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    tags: data.tags || [],
    category: data.category || '默认',
    published: data.published !== false,
    pinned: data.pinned || false,
    image: data.image || undefined,
  }

  const mdContent = `---\n${Object.entries(frontmatter)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}: [${v.map(i => `"${i}"`).join(', ')}]`
      if (typeof v === 'boolean') return `${k}: ${v}`
      return `${k}: ${v}`
    })
    .join('\n')}\n---\n\n${data.content}`

  fs.writeFileSync(filePath, mdContent, 'utf8')
  return { slug, ...frontmatter, content: data.content, updated: undefined, lang: 'zh-CN', comment: true } as Post
}

export function updatePost(slug: string, data: Partial<Post> & { content?: string }): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const existing = getPostBySlug(slug)
  if (!existing) return null

  const frontmatter: Record<string, any> = {
    title: data.title || existing.title,
    description: data.description || existing.description,
    date: existing.date.split('T')[0],
    updated: new Date().toISOString().split('T')[0],
    tags: data.tags || existing.tags,
    category: data.category || existing.category,
    published: data.published !== undefined ? data.published : existing.published,
    pinned: data.pinned !== undefined ? data.pinned : existing.pinned,
    image: data.image !== undefined ? data.image : existing.image,
  }

  const content = data.content !== undefined ? data.content : existing.content
  const mdContent = `---\n${Object.entries(frontmatter)
    .filter(([_, v]) => v !== null && v !== undefined)
    .map(([k, v]) => {
      if (Array.isArray(v)) return `${k}: [${v.map(i => `"${i}"`).join(', ')}]`
      if (typeof v === 'boolean') return `${k}: ${v}`
      return `${k}: ${v}`
    })
    .join('\n')}\n---\n\n${content}`

  fs.writeFileSync(filePath, mdContent, 'utf8')
  return { slug, ...frontmatter, content } as unknown as Post
}

export function deletePost(slug: string): boolean {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(filePath)) return false
  fs.unlinkSync(filePath)
  return true
}
