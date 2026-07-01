import fs from 'fs'
import path from 'path'

export interface Comment {
  id: string
  slug: string
  nickname: string
  email: string
  content: string
  avatar: string
  createdAt: string
}

const commentsDir = path.join(process.cwd(), 'data/comments')

function ensureDir() {
  if (!fs.existsSync(commentsDir)) {
    fs.mkdirSync(commentsDir, { recursive: true })
  }
}

function getFilePath(slug: string) {
  return path.join(commentsDir, `${slug}.json`)
}

export function getComments(slug: string): Comment[] {
  ensureDir()
  const filePath = getFilePath(slug)
  if (!fs.existsSync(filePath)) return []
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data) as Comment[]
  } catch {
    return []
  }
}

export function addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Comment {
  ensureDir()
  const filePath = getFilePath(comment.slug)
  const existing = getComments(comment.slug)
  const newComment: Comment = {
    ...comment,
    id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  }
  existing.push(newComment)
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8')
  return newComment
}

export function deleteComment(slug: string, id: string): boolean {
  ensureDir()
  const filePath = getFilePath(slug)
  if (!fs.existsSync(filePath)) return false
  const comments = getComments(slug).filter(c => c.id !== id)
  fs.writeFileSync(filePath, JSON.stringify(comments, null, 2), 'utf8')
  return true
}

export function getAllCommentsCount(): Record<string, number> {
  ensureDir()
  const result: Record<string, number> = {}
  const files = fs.readdirSync(commentsDir).filter(f => f.endsWith('.json'))
  for (const file of files) {
    const slug = file.replace('.json', '')
    try {
      const data = fs.readFileSync(path.join(commentsDir, file), 'utf8')
      const comments = JSON.parse(data) as Comment[]
      result[slug] = comments.length
    } catch {}
  }
  return result
}

// Available avatar list
export const AVATARS = [
  '/avatars/avatar-1.png',
  '/avatars/avatar-2.png',
  '/avatars/avatar-3.png',
  '/avatars/avatar-4.png',
  '/avatars/avatar-5.png',
  '/avatars/avatar-6.png',
  '/avatars/avatar-7.png',
  '/avatars/avatar-8.png',
]

export function getRandomAvatar(): string {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)]
}
