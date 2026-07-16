'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategorySortOption } from '@/lib/category-sort';

interface CategoryPageHeaderProps {
  title: string;
  subtitle?: string;
  countLabel?: string;
  sort: CategorySortOption;
  onSortChange: (value: CategorySortOption) => void;
  showSort?: boolean;
}

export const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({
  title,
  subtitle,
  countLabel,
  sort,
  onSortChange,
  showSort = true,
}) => {
  const { t } = useLanguage();

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
        <nav
          className="mb-5 sm:mb-6 text-xs text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-start">
            <li>
              <Link
                href="/"
                className="hover:text-foreground transition-colors duration-200"
                transitionTypes={['nav-back']}
              >
                {t.homeLabel}
              </Link>
            </li>
            <li className="text-muted-foreground/40 select-none" aria-hidden="true">
              /
            </li>
            <li className="text-muted-foreground truncate max-w-[min(100%,20rem)]" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-5 lg:gap-6">
          <div className="flex flex-col gap-3 text-start lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold tracking-tight text-foreground leading-[1.15]">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {countLabel && (
              <p className="shrink-0 lg:pb-0.5">
                <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground tabular-nums">
                  {countLabel}
                </span>
              </p>
            )}
          </div>

          {showSort && (
            <div className="flex flex-col gap-2 text-start lg:ms-auto lg:w-[240px] lg:shrink-0">
              <label
                htmlFor="category-sort"
                className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t.sortByLabel}
              </label>
              <Select value={sort} onValueChange={(value) => onSortChange(value as CategorySortOption)}>
                <SelectTrigger id="category-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t.sortNewest}</SelectItem>
                  <SelectItem value="price_asc">{t.sortPriceLowHigh}</SelectItem>
                  <SelectItem value="price_desc">{t.sortPriceHighLow}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
