'use client';

import React, { useMemo, useState } from 'react';
import { CheckCircle2, PackageCheck, Search, Trash2, Truck } from 'lucide-react';
import type { AdminOrderRow } from '@/lib/admin/orders';
import {
  ADMIN_ORDER_STATUSES,
  ADMIN_STATUS_LABELS,
  type AdminOrderStatus,
} from '@/lib/admin/order-status';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { OrderItemsCell } from '@/components/admin/OrderItemsCell';
import { cn } from '@/lib/utils';

interface OrdersTableProps {
  initialOrders: AdminOrderRow[];
}

const QUICK_STATUS_ACTIONS: {
  status: AdminOrderStatus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  activeClassName: string;
}[] = [
  {
    status: 'confirme',
    label: 'Confirmer',
    icon: CheckCircle2,
    className:
      'border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-200 dark:hover:bg-sky-950/50',
    activeClassName: 'ring-2 ring-sky-400 ring-offset-2 ring-offset-background dark:ring-sky-500',
  },
  {
    status: 'expedie',
    label: 'En livraison',
    icon: Truck,
    className:
      'border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-200 dark:hover:bg-indigo-950/50',
    activeClassName: 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-background dark:ring-indigo-500',
  },
  {
    status: 'livre',
    label: 'Livré',
    icon: PackageCheck,
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200 dark:hover:bg-emerald-950/50',
    activeClassName: 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-background dark:ring-emerald-500',
  },
];

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('fr-MA', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatOrderId(id: string): string {
  return id.slice(0, 8).toUpperCase();
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AdminOrderStatus>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        order.customerName.toLowerCase().includes(normalizedQuery) ||
        order.phoneNumber.replace(/\s+/g, '').includes(normalizedQuery.replace(/\s+/g, '')) ||
        order.items.some(
          (item) =>
            item.productName.toLowerCase().includes(normalizedQuery) ||
            item.slug?.toLowerCase().includes(normalizedQuery)
        );

      return matchesStatus && matchesQuery;
    });
  }, [orders, query, statusFilter]);

  const handleStatusChange = async (orderId: string, status: AdminOrderStatus) => {
    setUpdatingId(orderId);
    setError('');

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? 'Mise à jour impossible.');
      }

      setOrders((current) =>
        current.map((order) => (order.id === orderId ? { ...order, status } : order))
      );
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Erreur inconnue.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (orderId: string, customerName: string) => {
    const confirmed = window.confirm(
      `Supprimer la commande #${formatOrderId(orderId)} de ${customerName} ? Cette action est irréversible.`
    );
    if (!confirmed) return;

    setDeletingId(orderId);
    setError('');

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, { method: 'DELETE' });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? 'Suppression impossible.');
      }

      setOrders((current) => current.filter((order) => order.id !== orderId));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Erreur inconnue.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="voltix-surface overflow-hidden">
      <div className="border-b border-border px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Gestion des commandes</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''} affichée
              {filteredOrders.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-[240px]">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher nom, téléphone ou produit…"
                className="h-11 w-full border border-border bg-card ps-10 pe-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-muted-foreground"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as 'all' | AdminOrderStatus)}
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {ADMIN_ORDER_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {ADMIN_STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-muted/60 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-start font-medium">Commande</th>
              <th className="px-5 py-3 text-start font-medium">Client</th>
              <th className="min-w-[280px] px-5 py-3 text-start font-medium">Produits</th>
              <th className="px-5 py-3 text-start font-medium">Total</th>
              <th className="px-5 py-3 text-start font-medium">Statut</th>
              <th className="min-w-[280px] px-5 py-3 text-start font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                  Aucune commande ne correspond à votre recherche.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-border align-top">
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">#{formatOrderId(order.id)}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">{order.customerName}</p>
                      <p className="mt-1 text-muted-foreground">{order.phoneNumber}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {order.address}
                        <br />
                        {order.city}
                      </p>
                    </td>

                    <td className="min-w-[280px] px-5 py-4">
                      <OrderItemsCell items={order.items} />
                    </td>

                    <td className="px-5 py-4 font-semibold tabular-nums text-foreground">
                      {order.totalPrice} DH
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex min-w-[280px] flex-col gap-2.5">
                        <div className="flex flex-wrap gap-2">
                          {QUICK_STATUS_ACTIONS.map(({ status, label, icon: Icon, className, activeClassName }) => {
                            const isActive = order.status === status;
                            const isBusy = updatingId === order.id || deletingId === order.id;

                            return (
                              <button
                                key={status}
                                type="button"
                                onClick={() => handleStatusChange(order.id, status)}
                                disabled={isBusy || isActive}
                                title={isActive ? `Déjà ${label.toLowerCase()}` : label}
                                className={cn(
                                  'inline-flex items-center gap-1.5 border px-3 py-2 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                                  className,
                                  isActive && activeClassName
                                )}
                              >
                                <Icon className="h-3.5 w-3.5 shrink-0" />
                                {label}
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Select
                            value={
                              order.status === 'nouveau' || order.status === 'rto'
                                ? order.status
                                : undefined
                            }
                            onValueChange={(value) =>
                              handleStatusChange(order.id, value as AdminOrderStatus)
                            }
                            disabled={updatingId === order.id || deletingId === order.id}
                          >
                            <SelectTrigger className="h-9 w-[150px] text-xs">
                              <SelectValue placeholder="RTO / Nouveau" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nouveau">{ADMIN_STATUS_LABELS.nouveau}</SelectItem>
                              <SelectItem value="rto">{ADMIN_STATUS_LABELS.rto}</SelectItem>
                            </SelectContent>
                          </Select>

                          <button
                            type="button"
                            onClick={() => handleDelete(order.id, order.customerName)}
                            disabled={deletingId === order.id || updatingId === order.id}
                            className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50"
                          >
                            <Trash2 className="h-3.5 w-3.5 shrink-0" />
                            {deletingId === order.id ? 'Suppression…' : 'Supprimer'}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
