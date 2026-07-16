'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const CategoryEmptyState: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-lg px-5 py-20 sm:py-28 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-4">
        {t.categoriesTitle}
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-3">
        {t.noCategoryProducts}
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-10">{t.categoryEmptyDesc}</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center min-w-[220px] px-8 py-3.5 text-sm font-medium tracking-wide bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200"
        transitionTypes={['nav-back']}
      >
        {t.categoryEmptyCta}
      </Link>
    </section>
  );
};
