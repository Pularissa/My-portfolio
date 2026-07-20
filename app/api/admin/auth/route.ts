import { NextRequest, NextResponse } from 'next/server';

const PASSWORD = process.env.ADMIN_PASSWORD ?? 'prisca2025';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== PASSWORD) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_auth', 'true', {
    httpOnly: true,
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
    sameSite: 'strict',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete('admin_auth');
  return res;
}
