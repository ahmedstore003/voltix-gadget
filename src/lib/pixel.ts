/**
 * Analytics tracking utilities for Voltix COD Funnel.
 * Client events only fire when pixel scripts are loaded (fbq / ttq present).
 */

import { hasAnyRealPixel } from '@/lib/analytics/pixels';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      load: (pixelId: string) => void;
    };
  }
}

const logAnalyticsEvent = (pixelName: string, eventName: string, params?: unknown) => {
  if (process.env.NODE_ENV === 'development' && hasAnyRealPixel()) {
    console.log(`[${pixelName}] ${eventName}`, params);
  }
};

export const trackViewContent = (productName: string, price: number, currency = 'MAD') => {
  const params = {
    content_name: productName,
    content_category: 'Smart Wearables',
    value: price,
    currency,
  };

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', params);
  }
  logAnalyticsEvent('Meta Pixel', 'ViewContent', params);

  if (typeof window !== 'undefined' && typeof window.ttq?.track === 'function') {
    window.ttq.track('ViewContent', {
      contents: [{ content_name: productName, price }],
      value: price,
      currency,
    });
  }
  logAnalyticsEvent('TikTok Pixel', 'ViewContent', { productName, price, currency });
};

export const trackInitiateCheckout = (
  productName: string,
  quantity: number,
  price: number,
  currency = 'MAD'
) => {
  const params = {
    content_name: productName,
    num_items: quantity,
    value: price * quantity,
    currency,
  };

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', params);
  }
  logAnalyticsEvent('Meta Pixel', 'InitiateCheckout', params);

  if (typeof window !== 'undefined' && typeof window.ttq?.track === 'function') {
    window.ttq.track('InitiateCheckout', {
      contents: [{ content_name: productName, quantity, price }],
      value: price * quantity,
      currency,
    });
  }
  logAnalyticsEvent('TikTok Pixel', 'InitiateCheckout', { productName, quantity, price, currency });
};

/**
 * Legacy checkout hook — conversion is tracked on /thank-you when pixels are ready.
 */
export const trackPurchase = async (
  orderId: string,
  totalAmount: number,
  currency = 'MAD',
  _customerDetails?: { name?: string; phone?: string; city?: string }
) => {
  if (process.env.NODE_ENV === 'development' && hasAnyRealPixel()) {
    console.log('[Analytics] Purchase deferred to thank-you page', { orderId, totalAmount, currency });
  }
};
