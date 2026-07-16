'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { SuccessCheckmark } from '@/components/checkout/SuccessCheckmark';
import { OrderInvoiceSummary } from '@/components/checkout/OrderInvoiceSummary';
import {
  fetchOrderDetails,
  readOrderSnapshot,
  resolveOrderUpsell,
  type OrderRecord,
} from '@/lib/orders';

const PostPurchaseUpsell = dynamic(
  () => import('@/components/checkout/PostPurchaseUpsell').then((mod) => mod.PostPurchaseUpsell),
  { ssr: false, loading: () => null }
);

const PremiumToast = dynamic(
  () => import('@/components/checkout/PremiumToast').then((mod) => mod.PremiumToast),
  { ssr: false, loading: () => null }
);

interface ThankYouExperienceProps {
  orderId: string | null;
}

export const ThankYouExperience: React.FC<ThankYouExperienceProps> = ({ orderId }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [upsellProduct, setUpsellProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const loadOrder = useCallback(async (id: string) => {
    setLoading(true);

    let details = readOrderSnapshot(id);
    if (!details) {
      details = await fetchOrderDetails(id);
    }

    if (!details) {
      setOrder(null);
      setUpsellProduct(null);
      setLoading(false);
      return;
    }

    setOrder(details.order);

    const upsell = await resolveOrderUpsell(details.items, details.order.upsell_added);
    setUpsellProduct(upsell);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }
    loadOrder(orderId);
  }, [orderId, loadOrder]);

  const handleUpsellSuccess = (newTotal: number) => {
    setOrder((prev) => (prev ? { ...prev, total_price: newTotal, upsell_added: true } : prev));
    setUpsellProduct(null);
  };

  const handleToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  if (!orderId) {
    return (
      <section className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-sm text-muted-foreground mb-8">{t.orderNotFoundDesc}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center min-w-[200px] px-8 py-3.5 text-sm font-medium tracking-wide voltix-cta transition-opacity duration-200"
          transitionTypes={['nav-back']}
        >
          {t.backToStore}
        </Link>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Loading" />
      </section>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="text-xl font-semibold text-foreground mb-3">{t.orderNotFound}</h1>
        <p className="text-sm text-muted-foreground mb-8">{t.orderNotFoundDesc}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center min-w-[200px] px-8 py-3.5 text-sm font-medium tracking-wide voltix-cta transition-opacity duration-200"
          transitionTypes={['nav-back']}
        >
          {t.backToStore}
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-2xl px-5 sm:px-8 py-16 sm:py-24">
        <SuccessCheckmark />

        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4">
            {t.orderConfirmedTitle}
          </h1>
          <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-xl mx-auto text-start sm:text-center">
            {t.thankYouConfirmationMessage}
          </p>
        </div>

        <div className="space-y-6">
          <OrderInvoiceSummary order={order} />

          {upsellProduct && (
            <PostPurchaseUpsell
              orderId={order.id}
              currentTotal={order.total_price}
              customerName={order.customer_name}
              phoneNumber={order.phone_number}
              upsellProduct={upsellProduct}
              onSuccess={handleUpsellSuccess}
              onToast={handleToast}
            />
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-w-[200px] px-8 py-3.5 text-sm font-medium tracking-wide border border-border text-foreground hover:bg-muted transition-colors duration-200"
            transitionTypes={['nav-back']}
          >
            {t.backToStore}
          </Link>
        </div>
      </section>

      <PremiumToast
        message={toastMessage}
        visible={showToast}
        onDismiss={() => setShowToast(false)}
      />
    </>
  );
};
