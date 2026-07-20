import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

function auth(req: NextRequest) {
  return req.cookies.get('admin_auth')?.value === 'true';
}

export async function GET() {
  return NextResponse.json(store.profile);
}

export async function PUT(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  store.profile = { ...store.profile, ...body };
  return NextResponse.json(store.profile);
}
