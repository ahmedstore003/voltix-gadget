'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const ProductNotFoundContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col items-center justify-center text-center px-5 py-24 sm:py-32 min-h-[55vh]">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500 mb-6">
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-50 mb-4">
        {t.productNotFound}
      </h1>
      <p className="text-sm text-zinc-400 leading-relaxed max-w-md mb-10">
        {t.productNotFoundDesc}
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center min-w-[200px] px-8 py-3.5 text-sm font-medium tracking-wide bg-zinc-50 text-zinc-950 hover:bg-white transition-colors duration-200"
        transitionTypes={['nav-back']}
      >
        {t.backToStore}
      </Link>
    </section>
  );
};
