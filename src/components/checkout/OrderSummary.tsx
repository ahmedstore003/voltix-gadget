'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, Truck } from 'lucide-react';
import { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { productTitle } from '@/lib/i18n';
import { isRealImageUrl } from '@/lib/images';
import { cn } from '@/lib/utils';

export interface OrderLineItem {
  product: Product;
  quantity: number;
  unitPrice?: number;
}

interface OrderSummaryProps {
  items: OrderLineItem[];
  totalPrice: number;
  collapsible?: boolean;
  className?: string;
}

function OrderSummaryContent({
  items,
  totalPrice,
}: {
  items: OrderLineItem[];
  totalPrice: number;
}) {
  const { t, language } = useLanguage();

  return (
    <>
      <div className="inline-flex items-center gap-2 voltix-surface px-3 py-1.5 mb-5 shadow-sm">
        <Truck className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground">
          {t.checkoutFreeShippingBadge}
        </span>
      </div>

      <div className="mb-5 rounded-lg border border-border/70 bg-background/50 p-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Votre commande
        </p>
        <p className="mt-1 text-sm text-foreground">
          {items.reduce((count, item) => count + item.quantity, 0)} article{items.reduce((count, item) => count + item.quantity, 0) > 1 ? 's' : ''} · {items.length} produit{items.length > 1 ? 's' : ''}
        </p>
      </div>

      <ul className="space-y-3">
        {items.map(({ product, quantity, unitPrice }) => {
          const title = productTitle(product, language);
          const imageUrl = product.image_urls[0];
          const lineUnit = unitPrice ?? product.price;
          const lineTotal = lineUnit * quantity;

          return (
            <li
              key={`${product.id}-${lineUnit}`}
              className="flex gap-3 rounded-lg border border-border/70 bg-background/40 p-3 text-start"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md voltix-surface">
                {imageUrl && isRealImageUrl(imageUrl) ? (
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[8px] uppercase tracking-wide text-muted-foreground px-1 text-center">
                    {product.slug.slice(0, 8)}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                  {title}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border/70 px-2 py-0.5">
                    Qté {quantity}
                  </span>
                  <span className="tabular-nums">{lineUnit} {t.currencyMad} / unité</span>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-foreground tabular-nums">
                  {lineTotal} {t.currencyMad}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Sous-total
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
        <div className="flex justify-between gap-4 text-muted-foreground">
          <span>{t.cartSubtotal}</span>
          <span className="tabular-nums">
            {totalPrice} {t.currencyMad}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="font-medium text-foreground">{t.totalLabel}</span>
          <span className="text-lg font-semibold text-foreground tabular-nums">
            {totalPrice} {t.currencyMad}
          </span>
        </div>
      </div>

      <p className="mt-5 text-[11px] text-muted-foreground leading-relaxed text-center">
        {t.codBadge}
      </p>
    </>
  );
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalPrice,
  collapsible = false,
  className,
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (collapsible) {
    return (
      <div className={cn('voltix-surface shadow-sm', className)}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-3 p-4 text-start"
          aria-expanded={isOpen}
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {t.orderSummaryTitle}
            </p>
            <p className="mt-1 text-base font-semibold text-foreground tabular-nums">
              {totalPrice} {t.currencyMad}
            </p>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {isOpen && (
          <div className="border-t border-border px-4 pb-5 pt-4">
            <OrderSummaryContent items={items} totalPrice={totalPrice} />
          </div>
        )}
      </div>
    );
  }

  return (
    <aside
      className={cn(
        'voltix-surface p-5 sm:p-6 text-start shadow-sm',
        className
      )}
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground mb-5">
        {t.orderSummaryTitle}
      </h2>
      <OrderSummaryContent items={items} totalPrice={totalPrice} />
    </aside>
  );
};
