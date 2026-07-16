'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const StoreFooter: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-card-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between text-xs text-muted-foreground">
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">{t.brandName}</p>
            <p>{t.footerDelivery}</p>
            <p className="mt-1">{t.footerContact}</p>
          </div>
          <div className="sm:text-right rtl:sm:text-left">
            <p>{t.footerCopyright}</p>
            <p className="mt-1">{t.footerMadeIn}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
