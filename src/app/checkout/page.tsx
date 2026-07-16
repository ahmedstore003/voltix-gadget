'use client';

import React from 'react';
import Link from 'next/link';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const { t } = useLanguage();

  const handleOrderSuccess = () => {};

  if (cartItems.length === 0) {
    return (
      <main className="flex-grow bg-background">
        <section className="mx-auto max-w-lg px-5 sm:px-8 py-24 sm:py-32 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-4">
            {t.checkoutCartTitle}
          </p>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">{t.cartEmpty}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10">{t.cartEmptyDesc}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center min-w-[200px] px-8 py-3.5 text-sm font-medium tracking-wide voltix-cta transition-opacity duration-200"
            transitionTypes={['nav-back']}
          >
            {t.continueShopping}
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-grow bg-background border-t border-border">
      <CheckoutForm onOrderSuccess={handleOrderSuccess} />
    </main>
  );
}
