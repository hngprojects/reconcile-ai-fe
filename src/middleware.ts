import { type NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'
import { apiAuthPrefix, protectedRoutes } from './routes'

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ROOT_DOMAIN = 'reconxi.com'

  const host = req.headers.get('host')?.replace('www.', '') ?? ''

  // 1. Handle subdomain restrictions first
  const isWaitlistSubdomain = host === `waitlist.${ROOT_DOMAIN}`

  // Rewrite all waitlist subdomain requests to /coming-soon path
  if (isWaitlistSubdomain) {
    return NextResponse.rewrite(
      new URL(`/coming-soon${pathname === '/' ? '' : pathname}`, req.url)
    )
  }

  if (pathname.startsWith(apiAuthPrefix)) {
    return null
  }
  const session = await auth()
  const isLoggedIn = !!session
  console.log('isLoggedIn', session)
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return null
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
