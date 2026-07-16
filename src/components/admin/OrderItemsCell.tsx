import React from 'react';
import Image from 'next/image';
import type { AdminOrderLineItem } from '@/lib/admin/orders';

interface OrderItemsCellProps {
  items: AdminOrderLineItem[];
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat('fr-MA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export const OrderItemsCell: React.FC<OrderItemsCellProps> = ({ items }) => {
  if (items.length === 0) {
    return <span className="text-muted-foreground">Aucun article</span>;
  }

  const itemsSubtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="space-y-3">
      <ul className="space-y-3">
        {items.map((item, index) => {
          const lineTotal = item.quantity * item.unitPrice;

          return (
            <li
              key={`${item.productName}-${index}`}
              className="flex gap-3 border-b border-border/60 pb-3 last:border-b-0 last:pb-0"
            >
              {item.imageUrl ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {items.length > 1 ? `#${index + 1}` : 'COD'}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="font-medium leading-snug text-foreground">{item.productName}</p>
                {item.slug && (
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{item.slug}</p>
                )}
                <p className="mt-1.5 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{item.quantity}</span>
                  {' × '}
                  {formatMoney(item.unitPrice)} DH
                  {' = '}
                  <span className="font-medium tabular-nums text-foreground">
                    {formatMoney(lineTotal)} DH
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      {items.length > 1 && (
        <p className="text-xs text-muted-foreground">
          {items.length} articles · sous-total {formatMoney(itemsSubtotal)} DH
        </p>
      )}
    </div>
  );
};
