import React from 'react';
import type { Product } from '@/context/CartContext';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeCategoryNav } from '@/components/home/HomeCategoryNav';
import { HomeTrendingGrid } from '@/components/home/HomeTrendingGrid';

interface HomePageProps {
  products: Product[];
}

export const HomePage: React.FC<HomePageProps> = ({ products }) => {
  return (
    <main className="flex-grow bg-background">
      <HomeHero />
      <HomeCategoryNav />
      <HomeTrendingGrid products={products} />
    </main>
  );
};
