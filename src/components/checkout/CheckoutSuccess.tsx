'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface CheckoutSuccessProps {
  orderId: string;
  totalPrice: number;
  customerName: string;
}

export const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({
  orderId,
  totalPrice,
  customerName,
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-lg px-5 sm:px-8 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground mb-6">
          {t.orderConfirmedTitle}
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4">
          {t.thankYouTitle}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          {t.whatsAppConfirmationDesc}
        </p>

        <div className="voltix-surface text-start p-6 sm:p-8 space-y-3 text-sm mb-10">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">{t.orderReferenceLabel}</span>
            <span className="font-mono text-foreground">
              {orderId.substring(0, 8).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">{t.fullName}</span>
            <span className="text-foreground">{customerName}</span>
          </div>
          <div className="flex justify-between gap-4 pt-3 border-t border-border">
            <span className="text-foreground">{t.totalLabel}</span>
            <span className="font-medium text-foreground tabular-nums">
              {totalPrice} {t.currencyMad}
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center min-w-[200px] px-8 py-3.5 text-sm font-medium tracking-wide border border-border text-foreground hover:bg-muted transition-colors duration-200"
          transitionTypes={['nav-back']}
        >
          {t.backToStore}
        </Link>
      </div>
    </section>
  );
};
