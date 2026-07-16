'use client';

import React, { useCallback, useState } from 'react';
import type { AdminOrderRow } from '@/lib/admin/orders';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminDashboardGate } from '@/components/admin/AdminDashboardGate';

export const AdminDashboardShell: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [orders, setOrders] = useState<AdminOrderRow[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const loadDashboard = useCallback(async () => {
    setLoadingOrders(true);

    try {
      const response = await fetch('/api/admin/orders', { cache: 'no-store' });

      if (!response.ok) {
        throw new Error('Impossible de charger les commandes.');
      }

      const payload = (await response.json()) as { orders: AdminOrderRow[] };
      setOrders(payload.orders);
      setUnlocked(true);
    } catch (error) {
      setUnlocked(false);
      setOrders([]);
      throw error instanceof Error ? error : new Error('Session invalide. Réessayez.');
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setUnlocked(false);
    setOrders([]);
  };

  if (loadingOrders && !unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Chargement du dashboard…
      </div>
    );
  }

  if (!unlocked) {
    return <AdminDashboardGate onSuccess={loadDashboard} />;
  }

  return <AdminDashboard orders={orders} onLogout={handleLogout} />;
};
