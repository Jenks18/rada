import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/studio(.*)',
  '/api/minisite(.*)',
])

function handleSubdomainRouting(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  const parts = hostname.split('.')
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')

  if (isLocalhost) {
    return NextResponse.next()
  }

  if (parts.length >= 3 && parts[0] !== 'www') {
    const username = parts[0]

    if (
      url.pathname.startsWith('/_next') ||
      url.pathname.startsWith('/api') ||
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/discover') ||
      url.pathname.startsWith('/studio') ||
      url.pathname.startsWith('/artists') ||
      url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up')
    ) {
      return NextResponse.next()
    }

    url.pathname = `/${username}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

const clerkAuthMiddleware = clerkMiddleware(async (auth, request: NextRequest) => {
  if (isProtectedRoute(request)) {
    const { userId } = await auth()
    if (!userId) {
      const signInUrl = new URL('/sign-in', request.url)
      signInUrl.searchParams.set('redirect_url', request.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  return handleSubdomainRouting(request)
})

export default clerkAuthMiddleware

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
