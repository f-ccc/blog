import { NextRequest, NextResponse } from 'next/server'
import { getComments, addComment, deleteComment, getRandomAvatar } from '@/lib/comments'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: '缺少 slug 参数' }, { status: 400 })
  const comments = getComments(slug)
  return NextResponse.json(comments)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug, nickname, email, content } = body

    if (!slug || !nickname || !content) {
      return NextResponse.json({ error: '昵称和内容不能为空' }, { status: 400 })
    }

    if (content.length > 1000) {
      return NextResponse.json({ error: '评论内容不能超过 1000 字' }, { status: 400 })
    }

    if (nickname.length > 20) {
      return NextResponse.json({ error: '昵称不能超过 20 个字符' }, { status: 400 })
    }

    const avatar = getRandomAvatar()
    const comment = addComment({
      slug,
      nickname: nickname.trim(),
      email: (email || '').trim(),
      content: content.trim(),
      avatar,
    })

    revalidatePath(`/blog/${slug}`)
    return NextResponse.json(comment, { status: 201 })
  } catch {
    return NextResponse.json({ error: '发布评论失败' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  const id = req.nextUrl.searchParams.get('id')
  if (!slug || !id) return NextResponse.json({ error: '缺少参数' }, { status: 400 })
  deleteComment(slug, id)
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json({ ok: true })
}
