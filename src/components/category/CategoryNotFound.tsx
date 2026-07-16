'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const CategoryNotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col items-center justify-center text-center px-5 py-24 sm:py-32 min-h-[55vh]">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground mb-6">
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-4">
        {t.categoryNotFound}
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-10">
        {t.categoryNotFoundDesc}
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center min-w-[200px] px-8 py-3.5 text-sm font-medium tracking-wide bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-200"
        transitionTypes={['nav-back']}
      >
        {t.backToStore}
      </Link>
    </section>
  );
};
