export const ADMIN_LOGIN_PATH = '/admin/login';
export const ADMIN_DASHBOARD_PATH = '/admin/dashboard';

/** Fautes de frappe fréquentes → dashboard officiel */
export const ADMIN_PATH_ALIASES: Record<string, string> = {
  '/admin': ADMIN_DASHBOARD_PATH,
  '/admin/daschboard': ADMIN_DASHBOARD_PATH,
  '/admin/dashbord': ADMIN_DASHBOARD_PATH,
  '/admin/dashbaord': ADMIN_DASHBOARD_PATH,
  '/admin/dashborad': ADMIN_DASHBOARD_PATH,
};

export function resolveAdminPagePath(pathname: string): string | null {
  if (pathname === ADMIN_LOGIN_PATH) return ADMIN_LOGIN_PATH;
  if (pathname === ADMIN_DASHBOARD_PATH) return ADMIN_DASHBOARD_PATH;

  const alias = ADMIN_PATH_ALIASES[pathname];
  if (alias) return alias;

  if (pathname.startsWith('/admin/')) {
    return ADMIN_DASHBOARD_PATH;
  }

  return null;
}

export function sanitizeAdminNextPath(next: string | null | undefined): string {
  const fallback = ADMIN_DASHBOARD_PATH;
  if (!next || !next.startsWith('/admin')) return fallback;

  const resolved = resolveAdminPagePath(next.split('?')[0] ?? next);
  return resolved === ADMIN_LOGIN_PATH ? fallback : resolved ?? fallback;
}
