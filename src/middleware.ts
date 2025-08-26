import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = ['/admin', '/employer', '/employee', '/profile', '/settings', '/achievements'];
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for auth pages and let client-side handle redirects
  // This is because Zustand persists to localStorage which is not available server-side
  if (authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // For protected routes, let the ProtectedRoute component handle authentication
  // since it has access to the client-side auth state
  return NextResponse.next();
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
};