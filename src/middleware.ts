import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Extract the subdomain from the hostname
  // hostname examples: "jio.rada.bio", "www.rada.bio", "rada.bio", "localhost:3001"
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
    
    // Don't rewrite if already on a dynamic route or dashboard/api paths
    if (
      url.pathname.startsWith('/_next') ||
      url.pathname.startsWith('/api') ||
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/discover') ||
      url.pathname.startsWith('/studio') ||
      url.pathname.startsWith('/artists')
    ) {
      return NextResponse.next()
    }

    // Rewrite username.rada.bio/* to rada.bio/[username]/*
    url.pathname = `/${username}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  // For root domain (rada.bio or www.rada.bio), continue normally
  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|public/).*)',
  ],
}
