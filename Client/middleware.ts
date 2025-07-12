import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // List of paths that should redirect to homepage
  const redirectPaths = [
    '/mobile-prototype',
    '/auth/login',
    // Add more paths here as needed
  ]

  // Check if the current path should be redirected
  if (redirectPaths.includes(request.nextUrl.pathname)) {
    // Allow the page to load normally, the client-side redirect will handle it
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
