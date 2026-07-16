export type AdminOrderStatus = 'nouveau' | 'confirme' | 'expedie' | 'livre' | 'rto';

export const ADMIN_ORDER_STATUSES: AdminOrderStatus[] = [
  'nouveau',
  'confirme',
  'expedie',
  'livre',
  'rto',
];

export const ADMIN_STATUS_LABELS: Record<AdminOrderStatus, string> = {
  nouveau: 'Nouveau',
  confirme: 'Confirmé',
  expedie: 'En livraison',
  livre: 'Livré',
  rto: 'RTO (Retour à l\'expéditeur)',
};

const DB_TO_ADMIN: Record<string, AdminOrderStatus> = {
  pending: 'nouveau',
  confirmed: 'confirme',
  shipped: 'expedie',
  delivered: 'livre',
  cancelled: 'rto',
  rto: 'rto',
};

const ADMIN_TO_DB: Record<AdminOrderStatus, string> = {
  nouveau: 'pending',
  confirme: 'confirmed',
  expedie: 'shipped',
  livre: 'delivered',
  rto: 'rto',
};

export function dbStatusToAdmin(status: string): AdminOrderStatus {
  return DB_TO_ADMIN[status] ?? 'nouveau';
}

export function adminStatusToDb(status: AdminOrderStatus): string {
  return ADMIN_TO_DB[status];
}

export function statusBadgeClass(status: AdminOrderStatus): string {
  switch (status) {
    case 'nouveau':
      return 'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900';
    case 'confirme':
      return 'bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-900';
    case 'expedie':
      return 'bg-indigo-100 text-indigo-900 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-200 dark:border-indigo-900';
    case 'livre':
      return 'bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900';
    case 'rto':
      return 'bg-red-100 text-red-900 border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-900';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}
