import { NextResponse, NextRequest } from 'next/server'
import { EnumTokens } from './shared/api'
import { PLATFORM_PAGES } from './shared/config/pages-url.config'

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  const isAuthPage = url.includes('/auth')

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(PLATFORM_PAGES.HOME, url))
  }

  if (isAuthPage) {
    return NextResponse.next()
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL(PLATFORM_PAGES.LOGIN, url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth/:path*', '/new', '/profile'],
}
