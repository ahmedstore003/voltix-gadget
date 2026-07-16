'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { productTitle } from '@/lib/i18n';
import { isRealImageUrl } from '@/lib/images';

interface HomeProductCardProps {
  product: Product;
  priority?: boolean;
}

export const HomeProductCard: React.FC<HomeProductCardProps> = ({ product, priority = false }) => {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);

  const title = productTitle(product, language);
  const imageUrl = product.image_urls[0];

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <article className="group flex flex-col touch-manipulation transform-gpu">
      <div className="relative aspect-[4/5] voltix-image-frame voltix-surface shadow-sm">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-0 block bg-muted"
          aria-label={title}
        >
          <span className="absolute inset-0 bg-muted" aria-hidden />
          {imageUrl && isRealImageUrl(imageUrl) ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              priority={priority}
              className="object-cover transform-gpu transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={95}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground select-none pointer-events-none px-4 text-center">
              {product.slug.replace(/-/g, ' ')}
            </span>
          )}
        </Link>

        <div className="pointer-events-none absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-opacity duration-300 ease-out transform-gpu" />

        <div className="hidden sm:block absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4 pointer-events-none sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-transform duration-300 ease-out transform-gpu">
          <button
            type="button"
            onClick={handleAdd}
            className="pointer-events-auto w-full py-2.5 text-xs font-medium tracking-wide voltix-cta transition-opacity duration-200"
          >
            {isAdding ? t.addedToCart : t.addToCart}
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mt-5 flex flex-col gap-2 text-start min-h-[5.5rem]">
        <Link
          href={`/products/${product.slug}`}
          className="text-sm sm:text-[15px] font-medium text-foreground leading-snug hover:opacity-80 transition-opacity duration-200 line-clamp-2"
        >
          {title}
        </Link>

        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm font-medium text-foreground tabular-nums">
            {product.price} {t.currencyMad}
          </span>
          {product.compare_at_price && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {product.compare_at_price} {t.currencyMad}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="sm:hidden mt-1 w-full py-2.5 text-xs font-medium tracking-wide voltix-cta transition-opacity duration-200"
        >
          {isAdding ? t.addedToCart : t.addToCart}
        </button>

        <Link
          href={`/products/${product.slug}`}
          className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-opacity duration-200 w-fit"
        >
          {t.viewProduct}
        </Link>
      </div>
    </article>
  );
};
