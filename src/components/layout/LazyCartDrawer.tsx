'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useCart } from '@/context/CartContext';

const CartDrawer = dynamic(
  () => import('@/components/layout/CartDrawer').then((mod) => mod.CartDrawer),
  { ssr: false, loading: () => null }
);

export const LazyCartDrawer: React.FC = () => {
  const { isCartOpen } = useCart();

  if (!isCartOpen) return null;

  return <CartDrawer />;
};
