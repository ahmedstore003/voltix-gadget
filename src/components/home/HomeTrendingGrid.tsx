'use client';

import React from 'react';
import type { Product } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { HomeProductCard } from '@/components/home/HomeProductCard';

interface HomeTrendingGridProps {
  products: Product[];
}

export const HomeTrendingGrid: React.FC<HomeTrendingGridProps> = ({ products }) => {
  const { t } = useLanguage();

  return (
    <section id="collection" className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="mb-12 sm:mb-16 max-w-xl text-start">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-3">
            {t.homeBestsellersLabel}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-foreground">
            {t.trendingTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.trendingSub}
          </p>
        </header>

        {products.length === 0 ? (
          <p className="text-sm text-muted-foreground text-start">{t.noProductsAvailable}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-6 gap-y-12 sm:gap-y-14">
            {products.map((product, index) => (
              <HomeProductCard key={product.id} product={product} priority={index === 0} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
