import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

function auth(req: NextRequest) {
  return req.cookies.get('admin_auth')?.value === 'true';
}

export async function GET() {
  return NextResponse.json(store.projects);
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const newProject = { ...body, id: Date.now() };
  store.projects.push(newProject);
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const idx = store.projects.findIndex(p => p.id === body.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  store.projects[idx] = body;
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  store.projects = store.projects.filter(p => p.id !== id);
  return NextResponse.json({ ok: true });
}
