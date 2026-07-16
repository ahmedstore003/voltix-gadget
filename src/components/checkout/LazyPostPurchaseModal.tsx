'use client';

import dynamic from 'next/dynamic';
import type { PostPurchaseModalProps } from '@/components/checkout/PostPurchaseModal';

export const LazyPostPurchaseModal = dynamic<PostPurchaseModalProps>(
  () => import('@/components/checkout/PostPurchaseModal').then((mod) => mod.PostPurchaseModal),
  { ssr: false, loading: () => null }
);
