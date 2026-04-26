import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PROTECTED_ROUTES = [
  '/dashboard',
  '/manajemen-user',
  '/verifikasi-dokumen',
  '/layanan-paket',
  '/checkout-payment',
  '/database-pemakaman',
  '/cms-blog',
  '/pengaturan',
];

const AUTH_ROUTES = ['/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log(`Middleware: Path ${pathname} - Token found: ${!!token}`);

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Redirect unauthenticated users to login
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/manajemen-user/:path*',
    '/verifikasi-dokumen/:path*',
    '/layanan-paket/:path*',
    '/checkout-payment/:path*',
    '/database-pemakaman/:path*',
    '/cms-blog/:path*',
    '/pengaturan/:path*',
    '/login',
    '/register',
  ],
};
