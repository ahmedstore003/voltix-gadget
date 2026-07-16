'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { LazyCartDrawer } from '@/components/layout/LazyCartDrawer';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { ShoppingBag } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="voltix-frosted atlastrends-frosted">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] text-foreground transition-opacity hover:opacity-80"
          transitionTypes={['nav-back']}
        >
          {t.brandName}
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center border border-border bg-card text-xs shadow-sm">
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`px-2.5 py-1.5 transition-colors ${
                language === 'fr' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1.5 transition-colors ${
                language === 'ar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              AR
            </button>
          </div>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center border border-border bg-card text-foreground hover:bg-muted transition-colors shadow-sm"
            aria-label={t.cartTitle}
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -end-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-950 px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <LazyCartDrawer />
    </header>
  );
};
