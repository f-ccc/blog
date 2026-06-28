import { NextRequest, NextResponse } from 'next/server'
import { searchPosts } from '@/lib/posts'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || ''
  const results = searchPosts(q)
  // Return safe version without full content
  const safe = results.map(({ content, ...rest }) => rest)
  return NextResponse.json(safe)
}
