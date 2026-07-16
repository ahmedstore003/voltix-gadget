'use client';

import React, { useState } from 'react';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

interface AdminDashboardGateProps {
  onSuccess: () => Promise<void>;
}

export const AdminDashboardGate: React.FC<AdminDashboardGateProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? 'Mot de passe incorrect.');
      }

      await onSuccess();
      setPassword('');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Erreur inconnue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                AtlasTrends Admin
              </p>
              <h1 className="text-lg font-semibold text-foreground">Dashboard e-commerce COD</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto flex max-w-[1600px] justify-center px-5 py-10 sm:px-8 sm:py-16">
        <form onSubmit={handleSubmit} className="voltix-surface w-full max-w-md p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
              <LockKeyhole className="h-5 w-5" />
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
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full border border-border bg-card px-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-muted-foreground"
              autoComplete="current-password"
              autoFocus
              required
            />
          </label>

          {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-3.5 text-sm font-medium voltix-cta disabled:opacity-50"
          >
            {loading ? 'Vérification…' : 'Accéder au dashboard'}
          </button>
        </form>
      </main>
    </div>
  );
};
