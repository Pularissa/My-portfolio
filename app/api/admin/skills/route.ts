import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

function auth(req: NextRequest) {
  return req.cookies.get('admin_auth')?.value === 'true';
}

export async function GET() {
  return NextResponse.json(store.skills);
}

export async function PUT(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json(); // full skills array
  store.skills = body;
  return NextResponse.json(store.skills);
}
