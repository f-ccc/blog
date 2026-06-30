import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only protect /fc routes (except login)
  if (pathname.startsWith('/fc') && !pathname.startsWith('/fc/login')) {
    const auth = request.cookies.get('fc_auth')?.value
    if (auth !== 'true') {
      return NextResponse.redirect(new URL('/fc/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/fc/:path*'],
}
