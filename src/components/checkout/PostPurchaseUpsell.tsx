'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { productTitle, productDescription } from '@/lib/i18n';
import { applyOrderUpsell } from '@/lib/orders';
import { trackPurchase } from '@/lib/pixel';
import { isRealImageUrl } from '@/components/product/gallery/utils';
import { ExpandableDescription } from '@/components/product/ExpandableDescription';

interface PostPurchaseUpsellProps {
  orderId: string;
  currentTotal: number;
  customerName: string;
  phoneNumber: string;
  upsellProduct: Product;
  onSuccess: (newTotal: number) => void;
  onToast: (message: string) => void;
}

export const PostPurchaseUpsell: React.FC<PostPurchaseUpsellProps> = ({
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
  const description = productDescription(upsellProduct, language);
  const imageUrl = upsellProduct.image_urls[0];
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
    <section className="voltix-surface p-5 sm:p-6 text-start">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-4">
        {t.upsellExclusiveTitle}
      </p>

      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
        <div className="relative h-36 w-full sm:h-32 sm:w-32 shrink-0 overflow-hidden border border-border bg-muted rounded-lg">
          {imageUrl && isRealImageUrl(imageUrl) ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" sizes="128px" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[9px] uppercase tracking-wide text-muted-foreground px-3 text-center">
              {upsellProduct.slug.replace(/-/g, ' ')}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-semibold text-foreground leading-snug">{title}</h2>
          <ExpandableDescription
            text={description}
            className="mt-2"
            collapsedClamp="line-clamp-3"
          />

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-lg font-semibold text-foreground tabular-nums">
              {upsellProduct.price} {t.currencyMad}
            </span>
            {upsellProduct.compare_at_price && (
              <span className="text-sm text-muted-foreground line-through tabular-nums">
                {upsellProduct.compare_at_price} {t.currencyMad}
              </span>
            )}
            {discount > 0 && (
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] border border-border text-muted-foreground px-2 py-0.5">
                −{discount}%
              </span>
            )}
          </div>
        </div>
      </div>

      {error && <p className="mt-4 text-xs text-red-500 dark:text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleAddUpsell}
        disabled={loading}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 voltix-cta py-3.5 text-sm font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        <span>{loading ? t.processing : t.upsellOneClickCta}</span>
      </button>
    </section>
  );
};
