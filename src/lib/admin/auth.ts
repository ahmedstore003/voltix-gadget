import 'server-only';

import { createHash } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_SESSION_COOKIE = 'voltix_admin_session_v2';

export function getAdminPassword(): string {
  return process.env.ADMIN_DASHBOARD_PASSWORD || 'huaweiy6prime2019';
}

export function createAdminSessionToken(): string {
  return createHash('sha256').update(`voltix-admin:${getAdminPassword()}`).digest('hex');
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(token && token === createAdminSessionToken());
}

export async function assertAdminAuthenticated(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error('Unauthorized');
  }
}
