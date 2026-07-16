'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const HomeHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-center py-20 sm:py-28 lg:py-32 max-w-3xl">
          <p className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground mb-6 sm:mb-8">
            {t.heroTagline}
          </p>

          <h1 className="text-[2rem] sm:text-5xl lg:text-[3.25rem] font-semibold tracking-[-0.02em] text-foreground leading-[1.08] text-start">
            {t.heroTitle}
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl text-start">
            {t.heroSub}
          </p>

          <div className="mt-10 sm:mt-12">
            <Link
              href="#collection"
              className="inline-flex items-center justify-center min-w-[200px] px-8 py-3.5 text-sm font-medium tracking-wide voltix-cta transition-opacity duration-200"
            >
              {t.heroCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
