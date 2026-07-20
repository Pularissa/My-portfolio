import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const isAdmin     = req.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = req.nextUrl.pathname === '/admin/login';
  const authed      = req.cookies.get('admin_auth')?.value === 'true';

  if (isAdmin && !isLoginPage && !authed) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
