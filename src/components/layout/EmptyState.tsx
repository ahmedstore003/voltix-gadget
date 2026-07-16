'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface EmptyStateProps {
  message: string;
  showBackLink?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, showBackLink = false }) => {
  const { t } = useLanguage();

  return (
    <div className="py-24 text-center px-4">
      <p className="text-sm text-muted-foreground">{message}</p>
      {showBackLink && (
        <Link
          href="/"
          className="inline-block mt-6 text-sm font-medium text-foreground border-b border-foreground pb-0.5"
          transitionTypes={['nav-back']}
        >
          {t.backToStore}
        </Link>
      )}
    </div>
  );
};
