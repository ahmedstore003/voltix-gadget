'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ThankYouExperience } from '@/components/checkout/ThankYouExperience';
import { ThankYouPurchaseTracker } from '@/components/analytics/ThankYouPurchaseTracker';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');

  return (
    <>
      <ThankYouPurchaseTracker orderId={orderId} />
      <ThankYouExperience orderId={orderId} />
    </>
  );
}

export default function ThankYouPage() {
  return (
    <main className="flex-grow border-t border-border">
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Loading" />
          </div>
        }
      >
        <ThankYouContent />
      </Suspense>
    </main>
  );
}
