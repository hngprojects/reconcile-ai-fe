import { type NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'
import {
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  NEW_USERS_DEFAULT_LOGIN_REDIRECT,
  protectedRoutes,
} from './routes'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ROOT_DOMAIN = 'reconxi.com'

  // Extract subdomain (if any)
  const host = request.headers.get('host')?.replace('www.', '') || ''
  const subdomain =
    host.replace(`.${ROOT_DOMAIN}`, '') !== host
      ? host.replace(`.${ROOT_DOMAIN}`, '')
      : null

  // If on waitlist subdomain, rewrite all requests to /coming-soon
  if (subdomain === 'waitlist') {
    return NextResponse.rewrite(
      new URL(`/coming-soon${pathname === '/' ? '' : pathname}`, request.url)
    )
  }

  // Skip middleware for API auth routes
  if (pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next()
  }

  const isProtectedRoutes = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // Get session
  const session = await auth()
  const isLoggedIn = !!session
  const isNewUser = session?.user?.is_new_user

  // Determine appropriate redirect path
  const redirectPath = isNewUser
    ? NEW_USERS_DEFAULT_LOGIN_REDIRECT
    : DEFAULT_LOGIN_REDIRECT

  // Case 1: User is not logged in and trying to access protected routes
  if (!isLoggedIn && isProtectedRoutes) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Case 2: User is logged in, is a new user, and trying to access dashboard directly
  if (isLoggedIn && isNewUser && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL(redirectPath, request.url))
  }

  // Case 3: User is logged in, is NOT a new user, and trying to access onboarding
  if (isLoggedIn && !isNewUser && pathname.startsWith('/onboarding')) {
    return NextResponse.redirect(new URL(redirectPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
