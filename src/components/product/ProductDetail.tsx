'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Product, useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { LANG_STORAGE_KEY } from '@/lib/language';
import { productTitle, productDescription, categoryName } from '@/lib/i18n';
import {
  type BundleOffer,
  bundleQuantity,
  computeBundleCompareTotal,
  computeBundleSavingsFromProduct,
  computeBundleTotalFromProduct,
} from '@/lib/bundle-pricing';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductFeatureGrid } from '@/components/product/ProductFeatureGrid';
import { ExpandableDescription } from '@/components/product/ExpandableDescription';
import { BundleSelector } from '@/components/product/BundleSelector';
import { hasLimitedOffer } from '@/lib/product-visibility';

interface ProductDetailProps {
  product: Product;
  categoryNameFr: string;
  categoryNameAr: string;
  categorySlug?: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  categoryNameFr,
  categoryNameAr,
  categorySlug,
}) => {
  const { t, language, setLanguage } = useLanguage();
  const { addToCart } = useCart();
  const [bundleOffer, setBundleOffer] = useState<BundleOffer>('standard');

  const title = productTitle(product, language);
  const description = productDescription(product, language);
  const categoryLabel = categoryName(categoryNameFr, categoryNameAr, language);
  const catalogDiscount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const displayTotal = useMemo(
    () => computeBundleTotalFromProduct(product, bundleOffer),
    [product, bundleOffer]
  );

  const selectedQuantity = bundleQuantity(bundleOffer);
  const bundleSavings = computeBundleSavingsFromProduct(product, bundleOffer);
  const bundleCompare = computeBundleCompareTotal(product.price, bundleOffer);

  const scrollToCheckout = useCallback(() => {
    document.getElementById('pdp-checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleAddToCart = useCallback(() => {
    addToCart(product, selectedQuantity);
  }, [addToCart, product, selectedQuantity]);

  const handleOrderSuccess = useCallback(() => {}, []);

  useEffect(() => {
    if (product.default_lang_ar && !localStorage.getItem(LANG_STORAGE_KEY)) {
      setLanguage('ar');
    }
  }, [product.default_lang_ar, setLanguage]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16">
        <nav className="mb-8 sm:mb-10 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors" transitionTypes={['nav-back']}>
            {t.homeLabel}
          </Link>
          {categorySlug && (
            <>
              <span className="mx-2 text-border">/</span>
              <Link
                href={`/categories/${categorySlug}`}
                className="hover:text-foreground transition-colors"
                transitionTypes={['nav-back']}
              >
                {categoryLabel}
              </Link>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-start">
          <ProductGallery slug={product.slug} imageUrls={product.image_urls} title={title} />

          <div className="flex flex-col text-start">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-4">
              {categoryLabel}
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-semibold tracking-[-0.02em] text-foreground leading-[1.15]">
              {title}
            </h1>

            <button
              type="button"
              onClick={scrollToCheckout}
              className="mt-6 w-fit inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide voltix-cta transition-opacity duration-200"
            >
              {t.orderNowBundle}
            </button>

            <div className="mt-5 sm:mt-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums transition-all duration-200">
                  {displayTotal} {t.currencyMad}
                </span>
                {bundleCompare != null && (
                  <span className="text-sm text-muted-foreground line-through tabular-nums">
                    {bundleCompare} {t.currencyMad}
                  </span>
                )}
                {bundleOffer === 'standard' && product.compare_at_price && (
                  <>
                    <span className="text-sm text-muted-foreground line-through tabular-nums">
                      {product.compare_at_price} {t.currencyMad}
                    </span>
                    {catalogDiscount > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] border border-border text-muted-foreground">
                        −{catalogDiscount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              {product.compare_at_price && hasLimitedOffer(product) && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center px-2 py-0.5 font-medium uppercase tracking-[0.12em] border border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                    {t.limitedStock}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 font-medium uppercase tracking-[0.12em] border border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
                    {t.limitedOfferDays.replace('{days}', '5')}
                  </span>
                </div>
              )}
            </div>
              {(bundleOffer === 'duo' || bundleOffer === 'trio') && bundleSavings > 0 && (
                <p className="mt-3 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
                  {t.bundleSavingsBadge.replace('{amount}', String(bundleSavings))}
                </p>
              )}

              {bundleOffer === 'standard' && (
                <p className="mt-2 text-xs text-muted-foreground tabular-nums">
                  {product.price} {t.currencyMad} / {t.unitLabel}
                </p>
              )}

              {bundleOffer === 'duo' && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {t.bundleDuoQuantityHint.replace('{qty}', String(selectedQuantity))}
                </p>
              )}

              {bundleOffer === 'trio' && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {t.bundleTrioQuantityHint.replace('{qty}', String(selectedQuantity))}
                </p>
              )}
            </div>

            <ExpandableDescription text={description} className="mt-6" />

            <BundleSelector
              className="mt-8 sm:mt-10"
              product={product}
              selectedOffer={bundleOffer}
              onOfferChange={setBundleOffer}
              onOrderNow={scrollToCheckout}
            />

            <div className="mt-8 sm:mt-10">
              <ProductFeatureGrid />
            </div>

            <div className="mt-8 hidden lg:flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={scrollToCheckout}
                className="flex-1 py-3.5 text-sm font-medium tracking-wide voltix-cta transition-opacity duration-200"
              >
                {t.orderNowBundle}
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 text-sm font-medium tracking-wide border border-border bg-card text-foreground hover:bg-muted transition-colors duration-200"
              >
                {t.addToCart}
              </button>
            </div>

            <div id="pdp-checkout" className="mt-10 sm:mt-12 scroll-mt-24 lg:scroll-mt-8">
              <CheckoutForm
                onOrderSuccess={handleOrderSuccess}
                singleProduct={product}
                bundleOffer={bundleOffer}
                embedded
                inline
              />
            </div>
          </div>
        </div>
    </>
  );
};
