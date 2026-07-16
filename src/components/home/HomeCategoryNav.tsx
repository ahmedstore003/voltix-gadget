'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { LOCAL_CATEGORIES } from '@/lib/products-data';
import { categoryName } from '@/lib/i18n';

const CATEGORY_ORDER = ['gadgets', 'cuisine', 'cosmetique', 'trends'] as const;

export const HomeCategoryNav: React.FC = () => {
  const { t, language } = useLanguage();

  const categories = CATEGORY_ORDER.map((slug) =>
    LOCAL_CATEGORIES.find((c) => c.slug === slug)
  ).filter(Boolean) as typeof LOCAL_CATEGORIES;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10 sm:py-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-5 text-start">
          {t.categoriesTitle}
        </p>

        <div className="flex gap-2.5 sm:gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-1 -mx-1 px-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="snap-start shrink-0 inline-flex items-center voltix-surface px-5 py-2.5 text-xs sm:text-sm font-medium text-foreground shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {categoryName(cat.name_fr, cat.name_ar, language)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
