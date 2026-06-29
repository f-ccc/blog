import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, createPost } from '@/lib/posts'
import { revalidatePath } from 'next/cache'

export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const post = createPost(data)
    // 🎯 强制刷新前台文章缓存
    revalidatePath('/', 'layout')
    revalidatePath('/blog', 'page')
    revalidatePath('/archive', 'page')
    revalidatePath('/fc/posts', 'page')
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: '创建失败' }, { status: 500 })
  }
}
