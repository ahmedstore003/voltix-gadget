'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-24 min-h-[50vh]">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">404</p>
      <h1 className="text-xl font-semibold text-foreground mb-2">{t.pageNotFound}</h1>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm">{t.pageNotFoundDesc}</p>
      <Link
        href="/"
        className="text-sm font-medium border-b border-foreground pb-0.5 text-foreground"
        transitionTypes={['nav-back']}
      >
        {t.backToStore}
      </Link>
    </div>
  );
}
