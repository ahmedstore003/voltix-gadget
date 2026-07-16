'use client';

import React, { useState } from 'react';
import { LogOut, ShieldCheck } from 'lucide-react';
import type { AdminOrderRow } from '@/lib/admin/orders';
import { OrdersTable } from '@/components/admin/OrdersTable';
import { ProfitCalculator } from '@/components/admin/ProfitCalculator';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

interface AdminDashboardProps {
  orders: AdminOrderRow[];
  onLogout: () => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, onLogout }) => {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await onLogout();
    } finally {
      setLoggingOut(false);
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

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{loggingOut ? 'Déconnexion…' : 'Déconnexion'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8 sm:py-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-6 xl:self-start">
            <ProfitCalculator />
          </aside>

          <div>
            <OrdersTable initialOrders={orders} />
          </div>
        </div>
      </main>
    </div>
  );
};
