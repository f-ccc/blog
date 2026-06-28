import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = 'hjw'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password === ADMIN_PASSWORD) {
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

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
