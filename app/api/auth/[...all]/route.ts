import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'Better Auth routes removed. Use Clerk auth endpoints.' }, { status: 410 });
}

export async function POST() {
  return NextResponse.json({ error: 'Better Auth routes removed. Use Clerk auth endpoints.' }, { status: 410 });
}
