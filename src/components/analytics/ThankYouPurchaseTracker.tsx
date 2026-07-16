'use client';

import { useEffect, useRef } from 'react';
import { fetchOrderDetails, readOrderSnapshot } from '@/lib/orders';
import { getMetaPixelId, getTikTokPixelId } from '@/lib/analytics/pixels';

interface ThankYouPurchaseTrackerProps {
  orderId: string | null;
}

function isFbqReady(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

function isTtqReady(): boolean {
  return typeof window !== 'undefined' && typeof window.ttq?.track === 'function';
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPixelScripts(metaRequired: boolean, tiktokRequired: boolean): Promise<void> {
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const metaReady = !metaRequired || isFbqReady();
    const tiktokReady = !tiktokRequired || isTtqReady();

    if (metaReady && tiktokReady) {
      return;
    }

    await wait(250);
  }
}

export function ThankYouPurchaseTracker({ orderId }: ThankYouPurchaseTrackerProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    const metaRequired = Boolean(getMetaPixelId());
    const tiktokRequired = Boolean(getTikTokPixelId());

    if (!orderId || firedRef.current || (!metaRequired && !tiktokRequired)) {
      return;
    }

    let cancelled = false;

    async function fireConversionEvents() {
      const dedupeKey = `atlastrends_purchase_tracked_${orderId}`;
      if (sessionStorage.getItem(dedupeKey)) {
        firedRef.current = true;
        return;
      }

      await waitForPixelScripts(metaRequired, tiktokRequired);
      if (cancelled) return;

      const snapshot = readOrderSnapshot(orderId!) ?? (await fetchOrderDetails(orderId!));
      if (cancelled || !snapshot?.order) return;

      const { order } = snapshot;
      let didFire = false;

      if (isFbqReady()) {
        window.fbq!('track', 'Purchase', {
          content_name: 'AtlasTrends Order',
          value: order.total_price,
          currency: 'MAD',
          order_id: order.id,
        });
        didFire = true;
      }

      if (isTtqReady()) {
        window.ttq!.track('CompletePayment', {
          value: order.total_price,
          currency: 'MAD',
          contents: [{ content_id: order.id, price: order.total_price }],
        });
        didFire = true;
      }

      if (didFire) {
        sessionStorage.setItem(dedupeKey, '1');
        firedRef.current = true;
      }
    }

    void fireConversionEvents();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return null;
}
