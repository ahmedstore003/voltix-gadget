import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // On récupère le chemin que l'utilisateur essaie de visiter
  const path = request.nextUrl.pathname;

  // Sécurité : On protège uniquement le dossier /admin/dashboard
  if (path.startsWith('/admin/dashboard')) {
    
    // On vérifie si le cookie "is_admin" (celui qu'on a créé au login) existe
    const isAdmin = request.cookies.get('is_admin')?.value;

    // Si le cookie n'est pas là, on renvoie le visiteur vers la page de login
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Si tout est bon (ou si c'est une page publique), on laisse passer
  return NextResponse.next();
}

// Configuration : indique à Next.js sur quelles URL le middleware doit s'activer
export const config = {
  matcher: ['/admin/:path*'],
};