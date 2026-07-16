'use client';

import React from 'react';
import type { AdminOrderStatus } from '@/lib/admin/order-status';
import { ADMIN_STATUS_LABELS, statusBadgeClass } from '@/lib/admin/order-status';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: AdminOrderStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => (
  <span
    className={cn(
      'inline-flex items-center px-2.5 py-1 text-[11px] font-medium border rounded-full whitespace-nowrap',
      statusBadgeClass(status),
      className
    )}
  >
    {ADMIN_STATUS_LABELS[status]}
  </span>
);
