'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { productTitle } from '@/lib/i18n';
import { applyOrderUpsell } from '@/lib/orders';
import { trackPurchase } from '@/lib/pixel';
import { isRealImageUrl } from '@/components/product/gallery/utils';

const BANNER_SIZES = '(max-width: 640px) 100vw, 620px';

interface MiniBlenderUpsellProps {
  orderId: string;
  currentTotal: number;
  customerName: string;
  phoneNumber: string;
  upsellProduct: Product;
  onSuccess: (newTotal: number) => void;
  onToast: (message: string) => void;
}

export const MiniBlenderUpsell: React.FC<MiniBlenderUpsellProps> = ({
  orderId,
  currentTotal,
  customerName,
  phoneNumber,
  upsellProduct,
  onSuccess,
  onToast,
}) => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const title = productTitle(upsellProduct, language);
  const bannerUrl = upsellProduct.image_urls[0] ?? '';

  const discount =
    upsellProduct.compare_at_price && upsellProduct.compare_at_price > upsellProduct.price
      ? Math.round(
          ((upsellProduct.compare_at_price - upsellProduct.price) / upsellProduct.compare_at_price) *
            100
        )
      : 0;

  const handleAddUpsell = async () => {
    setLoading(true);
    setError('');

    try {
      const { totalPrice } = await applyOrderUpsell(orderId, currentTotal, upsellProduct);

      await trackPurchase(orderId, totalPrice, 'MAD', {
        name: customerName,
        phone: phoneNumber,
      });

      onSuccess(totalPrice);
      onToast(t.orderUpdatedToast);
    } catch {
      setError(t.submitError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="voltix-surface border border-border p-5 sm:p-6 text-start">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-4">
        {t.upsellExclusiveTitle}
      </p>

      <div className="relative mx-auto aspect-[16/9] w-full max-w-[620px] overflow-hidden border border-border bg-muted">
        {isRealImageUrl(bannerUrl) ? (
          <Image
            src={bannerUrl}
            alt={title}
            fill
            priority
            quality={90}
            sizes={BANNER_SIZES}
            className="object-cover [image-rendering:-webkit-optimize-contrast]"
            draggable={false}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {title}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-3 start-3 z-[1] border border-border bg-card/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
            −{discount}%
          </span>
        )}
      </div>

      <p className="mt-5 text-center text-xs font-medium text-muted-foreground leading-snug">
        {t.upsellAddFor} {upsellProduct.price} {t.currencyMad}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="text-lg font-semibold text-foreground tabular-nums">
          {upsellProduct.price} {t.currencyMad}
        </span>
        {upsellProduct.compare_at_price && (
          <span className="text-sm text-muted-foreground line-through tabular-nums">
            {upsellProduct.compare_at_price} {t.currencyMad}
          </span>
        )}
      </div>

      {error && <p className="mt-4 text-xs text-red-500 dark:text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleAddUpsell}
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 voltix-cta py-3.5 text-sm font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        <span>{loading ? t.processing : t.upsellOneClickCta}</span>
      </button>
    </section>
  );
};