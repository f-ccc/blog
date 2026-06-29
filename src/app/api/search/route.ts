import { NextRequest, NextResponse } from 'next/server'
import { searchPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || ''
  const results = searchPosts(q)
  // Return safe version without full content
  const safe = results.map(({ content, ...rest }) => ({ ...rest, content: content.slice(0, 200) }))
  return NextResponse.json(safe)
}
