import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/studio(.*)',
  '/api/minisite(.*)',
])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Protect dashboard and studio routes
  if (isProtectedRoute(request)) {
    const { userId } = await auth()
    if (!userId) {
      const signInUrl = new URL('/sign-in', request.url)
      signInUrl.searchParams.set('redirect_url', request.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  // Subdomain routing logic
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Extract the subdomain from the hostname
  const parts = hostname.split('.')
  
  // Check if we're on localhost (development)
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1')
  
  if (isLocalhost) {
    // For localhost, don't do subdomain routing
    return NextResponse.next()
  }

  // Production subdomain routing
  // Check if there's a subdomain (more than 2 parts for rada.bio, excluding www)
  if (parts.length >= 3 && parts[0] !== 'www') {
    // Extract the username (first part of subdomain)
    const username = parts[0]
    
    // Don't rewrite if already on certain paths
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

    // Rewrite username.rada.bio/* to rada.bio/[username]/*
    url.pathname = `/${username}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
})

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
