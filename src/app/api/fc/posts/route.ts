import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, createPost } from '@/lib/posts'

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const post = createPost(data)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}
