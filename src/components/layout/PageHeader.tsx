'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  countLabel?: string;
  breadcrumb?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  countLabel,
  breadcrumb,
}) => {
  const { t } = useLanguage();

  return (
    <div className="border-b border-card-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors" transitionTypes={['nav-back']}>
            {t.homeLabel}
          </Link>
          {breadcrumb && (
            <>
              <ChevronRight className="h-3 w-3 rtl:rotate-180" strokeWidth={1.5} />
              <span className="text-foreground">{breadcrumb}</span>
            </>
          )}
        </nav>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {countLabel && (
            <p className="text-xs text-muted-foreground">{countLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
};
