import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug, updatePost, deletePost } from '@/lib/posts'
import { revalidatePath } from 'next/cache'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const data = await request.json()
  const post = updatePost(slug, data)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  // 🎯 强制刷新前台缓存
  revalidatePath('/', 'layout')
  revalidatePath('/blog', 'page')
  revalidatePath(`/blog/${slug}`, 'page')
  revalidatePath('/archive', 'page')
  revalidatePath('/fc/posts', 'page')
  return NextResponse.json(post)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const success = deletePost(slug)
  if (!success) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  // 🎯 强制刷新前台缓存
  revalidatePath('/', 'layout')
  revalidatePath('/blog', 'page')
  revalidatePath('/archive', 'page')
  revalidatePath('/fc/posts', 'page')
  return NextResponse.json({ success: true })
}
