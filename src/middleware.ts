import { type NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'
import { apiAuthPrefix, protectedRoutes } from './routes'

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
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
