'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// On importe ta route exacte pour le dashboard
import { ADMIN_DASHBOARD_PATH } from '@/lib/admin/routes'; 

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (password === 'huaweiy6prime2019') { 
      // 1. On crée les cookies
      document.cookie = "admin_token=true; path=/"; 
      document.cookie = "is_admin=true; path=/"; 
      
      // 2. LA SOLUTION : On force un vrai rechargement de page
      // au lieu d'utiliser le routeur de Next.js
      window.location.href = '/admin/dashboard';
    } else {
      setError('Mot de passe incorrect.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex-1 flex flex-col">
      <header className="border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check h-5 w-5">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                AtlasTrends Admin
              </p>
              <h1 className="text-lg font-semibold text-foreground">
                Dashboard e-commerce COD
              </h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="mx-auto flex w-full max-w-[1600px] justify-center px-5 py-10 sm:px-8 sm:py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 sm:p-8 rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-keyhole h-5 w-5">
                <circle cx="12" cy="16" r="1"></circle>
                <rect x="3" y="10" width="18" height="12" rx="2"></rect>
                <path d="M7 10V7a5 5 0 0 1 10 0v3"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Accès sécurisé</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Entrez le mot de passe admin pour accéder au dashboard.
              </p>
            </div>
          </div>
          
          <label className="mt-6 block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Mot de passe
            </span>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-muted-foreground focus:ring-1 focus:ring-muted-foreground" 
              autoComplete="current-password" 
              autoFocus 
              required 
            />
          </label>

          {error && (
            <p className="mt-3 text-sm text-red-500 font-medium">
              {error}
            </p>
          )}
          
          <button 
            type="submit" 
            className="mt-6 w-full rounded-md bg-foreground text-background py-3.5 text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            Accéder au dashboard
          </button>
        </form>
      </main>
    </div>
  );
}