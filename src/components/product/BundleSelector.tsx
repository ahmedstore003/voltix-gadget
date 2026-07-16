'use client';

import React from 'react';
import { Check, Sparkles, TrendingUp } from 'lucide-react';
import type { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  type BundleOffer,
  computeBundleSavings,
  computeDuoCompareTotal,
  computeDuoPackTotal,
  computeTrioCompareTotal,
  computeTrioPackTotal,
  DUO_SECOND_UNIT_DISCOUNT,
  TRIO_THIRD_UNIT_DISCOUNT,
} from '@/lib/bundle-pricing';
import { cn } from '@/lib/utils';

interface BundleSelectorProps {
  product: Product;
  selectedOffer: BundleOffer;
  onOfferChange: (offer: BundleOffer) => void;
  onOrderNow?: () => void;
  className?: string;
}

export type { BundleOffer };

export const BundleSelector: React.FC<BundleSelectorProps> = ({
  product,
  selectedOffer,
  onOfferChange,
  onOrderNow,
  className,
}) => {
  const { t } = useLanguage();

  const unitPrice = product.price;
  const duoTotal = computeDuoPackTotal(unitPrice);
  const trioTotal = computeTrioPackTotal(unitPrice);
  const duoCompare = computeDuoCompareTotal(unitPrice);
  const trioCompare = computeTrioCompareTotal(unitPrice);
  const savings = computeBundleSavings(unitPrice, selectedOffer);
  const duoDiscountPercent = Math.round(DUO_SECOND_UNIT_DISCOUNT * 100);
  const trioDiscountPercent = Math.round(TRIO_THIRD_UNIT_DISCOUNT * 100);

  const options: {
    id: BundleOffer;
    title: string;
    subtitle: string;
    price: number;
    compareAt?: number;
    highlight?: 'duo' | 'trio';
    badge?: string;
    badgeIcon?: 'sparkles' | 'trending';
  }[] = [
    {
      id: 'standard',
      title: t.bundleStandardLabel,
      subtitle: t.bundleStandardSub.replace('{price}', String(unitPrice)),
      price: unitPrice,
    },
    {
      id: 'duo',
      title: t.bundleDuoLabel,
      subtitle: t.bundleDuoSub.replace('{percent}', String(duoDiscountPercent)),
      price: duoTotal,
      compareAt: duoCompare,
      highlight: 'duo',
      badge: t.bundleDuoRecommended,
      badgeIcon: 'sparkles',
    },
    {
      id: 'trio',
      title: t.bundleTrioLabel,
      subtitle: t.bundleTrioSub
        .replace('{duoPercent}', String(duoDiscountPercent))
        .replace('{trioPercent}', String(trioDiscountPercent)),
      price: trioTotal,
      compareAt: trioCompare,
      highlight: 'trio',
      badge: t.bundleTrioBadge,
      badgeIcon: 'trending',
    },
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {t.quantityTitle}
      </p>

      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        role="radiogroup"
        aria-label={t.quantityTitle}
      >
        {options.map((option) => {
          const selected = selectedOffer === option.id;
          const isDuo = option.highlight === 'duo';
          const isTrio = option.highlight === 'trio';

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onOfferChange(option.id)}
              className={cn(
                'relative w-full rounded-2xl border p-4 text-start transition-all duration-200',
                'bg-card shadow-sm',
                isDuo &&
                  !selected &&
                  'border-emerald-200/80 shadow-emerald-100/50 dark:border-emerald-900/50',
                isDuo &&
                  selected &&
                  'border-emerald-500 shadow-md shadow-emerald-500/15 ring-2 ring-emerald-500/30',
                isTrio &&
                  !selected &&
                  'border-indigo-200/80 shadow-indigo-100/50 dark:border-indigo-900/50',
                isTrio &&
                  selected &&
                  'border-indigo-500 shadow-md shadow-indigo-500/15 ring-2 ring-indigo-500/30',
                !isDuo &&
                  !isTrio &&
                  selected &&
                  'border-foreground ring-2 ring-foreground/10',
                !isDuo && !isTrio && !selected && 'border-border hover:border-muted-foreground/40',
                (isDuo || isTrio) && 'sm:scale-[1.01]'
              )}
            >
              {option.badge && (
                <span
                  className={cn(
                    'absolute -top-2.5 start-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em]',
                    isTrio
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-200'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                  )}
                >
                  {option.badgeIcon === 'trending' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <Sparkles className="h-3 w-3" />
                  )}
                  {option.badge}
                </span>
              )}

              <div className="flex flex-col gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                      selected && isTrio
                        ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-indigo-950'
                        : selected
                          ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-emerald-950'
                          : 'border-border bg-background'
                    )}
                  >
                    {selected && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  <p className="text-sm font-semibold text-foreground leading-tight">{option.title}</p>
                </div>

                <p className="text-[11px] leading-relaxed text-muted-foreground ps-7">{option.subtitle}</p>

                <div className="ps-7">
                  <p className="text-lg font-bold tabular-nums text-foreground">
                    {option.price} {t.currencyMad}
                  </p>
                  {option.compareAt && (
                    <p className="mt-0.5 text-xs text-muted-foreground line-through tabular-nums">
                      {option.compareAt} {t.currencyMad}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {(selectedOffer === 'duo' || selectedOffer === 'trio') && savings > 0 && (
        <p className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
          {t.bundleSavingsBadge.replace('{amount}', String(savings))}
        </p>
      )}

      {onOrderNow && (
        <button
          type="button"
          onClick={onOrderNow}
          className="w-full py-4 text-sm font-semibold tracking-wide voltix-cta transition-opacity duration-200 active:scale-[0.99]"
        >
          {t.orderNowBundle}
        </button>
      )}
    </div>
  );
};
