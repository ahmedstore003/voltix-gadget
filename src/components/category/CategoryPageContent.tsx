'use client';

import React, { useMemo, useState } from 'react';
import { HomeProductCard } from '@/components/home/HomeProductCard';
import { CategoryPageHeader } from '@/components/category/CategoryPageHeader';
import { CategoryEmptyState } from '@/components/category/CategoryEmptyState';
import { useLanguage } from '@/context/LanguageContext';
import { categoryName } from '@/lib/i18n';
import { sortCategoryProducts, type CategorySortOption } from '@/lib/category-sort';
import type { Product } from '@/context/CartContext';

interface CategoryPageContentProps {
  nameFr: string;
  nameAr: string;
  products: Product[];
}

export const CategoryPageContent: React.FC<CategoryPageContentProps> = ({
  nameFr,
  nameAr,
  products,
}) => {
  const { t, language } = useLanguage();
  const [sort, setSort] = useState<CategorySortOption>('newest');

  const title = categoryName(nameFr, nameAr, language);
  const subtitle = categoryName(nameFr, nameAr, language === 'fr' ? 'ar' : 'fr');
  const countLabel = `${products.length} ${
    products.length === 1 ? t.productCountLabel : t.productsCountLabel
  }`;

  const sortedProducts = useMemo(
    () => sortCategoryProducts(products, sort),
    [products, sort]
  );

  return (
    <>
      <CategoryPageHeader
        title={title}
        subtitle={subtitle}
        countLabel={countLabel}
        sort={sort}
        onSortChange={setSort}
        showSort={products.length > 0}
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {products.length === 0 ? (
            <CategoryEmptyState />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8 lg:gap-y-14">
              {sortedProducts.map((product) => (
                <HomeProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
