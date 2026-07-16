import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_LOGIN_PATH,
  resolveAdminPagePath,
} from '@/lib/admin/routes';

export const ADMIN_SESSION_COOKIE = 'atlastrends_admin_session_v2';

async function createAdminSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_DASHBOARD_PASSWORD || 'huaweiy6prime2019';
  const data = new TextEncoder().encode(`atlastrends-admin:${secret}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const expected = await createAdminSessionToken();
  return Boolean(token && token === expected);
}

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const resolved = resolveAdminPagePath(pathname);

    if (resolved && resolved !== pathname) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = resolved;
      return NextResponse.redirect(redirectUrl);
    }

    if (pathname === ADMIN_LOGIN_PATH) {
      return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
    }

    if (pathname === ADMIN_DASHBOARD_PATH) {
      return NextResponse.next();
    }
  }

  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login')) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export async function POST(request: NextRequest) {
  return GET(request);
}

export async function PUT(request: NextRequest) {
  return GET(request);
}

export async function DELETE(request: NextRequest) {
  return GET(request);
}

export async function PATCH(request: NextRequest) {
  return GET(request);
}
