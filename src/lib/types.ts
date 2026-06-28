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
