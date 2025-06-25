import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


const isProtectedRoute = createRouteMatcher([
  "/cart",
  "/checkout",
  "/success",
  "/profile",
  "/auth/logout",
])

const isAuthRoute = createRouteMatcher([
  "/auth/join-us",
  "/auth/sign-in",
  "/auth/forgot-password",
])

export default clerkMiddleware(async (auth, req) => {

  const {sessionId } = await auth()

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute(req) && !sessionId) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url))
  }

  // Redirect authenticated users from auth routes
  if (isAuthRoute(req) && sessionId) {
    return NextResponse.redirect(new URL('/', req.url))
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
