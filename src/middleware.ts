import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProtectedRoute = (pathname: string) => {
  return /^\/cart(\/.*)?$/.test(pathname) ||
    /^\/checkout(\/.*)?$/.test(pathname) ||
    /^\/success(\/.*)?$/.test(pathname) ||
    /^\/profile(\/.*)?$/.test(pathname) ||
    pathname === '/logout'
}

const isAuthRoute = (pathname: string) => {
  return /^\/join-us(\/.*)?$/.test(pathname) ||
    /^\/sign-in(\/.*)?$/.test(pathname) ||
    /^\/forgot-password(\/.*)?$/.test(pathname)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get session from cookies or headers
  const sessionId = request.cookies.get('sessionId')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')

  const isAuthenticated = !!sessionId

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  // Redirect authenticated users from auth routes
  if (isAuthRoute(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
