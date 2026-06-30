import { NextRequest, NextResponse } from 'next/server'
import { getConfig } from '@/lib/config'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const config = getConfig()

  if (password === config.adminPassword) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('fc_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/fc',
    })
    return response
  }

  return NextResponse.json({ error: '密码错误' }, { status: 401 })
}
