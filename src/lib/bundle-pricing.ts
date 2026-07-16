import type { Product } from '@/context/CartContext';

/** Remise sur le 2e produit (pack Duo et Trio). */
export const DUO_SECOND_UNIT_DISCOUNT = 0.4;

/** Remise sur le 3e produit (pack Trio uniquement). */
export const TRIO_THIRD_UNIT_DISCOUNT = 0.6;

export type BundleOffer = 'standard' | 'duo' | 'trio';

export function bundleQuantity(offer: BundleOffer): number {
  if (offer === 'trio') return 3;
  if (offer === 'duo') return 2;
  return 1;
}

export function computeStandardTotal(unitPrice: number): number {
  return unitPrice;
}

export function computeSecondUnitPrice(unitPrice: number): number {
  return Math.round(unitPrice * (1 - DUO_SECOND_UNIT_DISCOUNT) * 100) / 100;
}

export function computeThirdUnitPrice(unitPrice: number): number {
  return Math.round(unitPrice * (1 - TRIO_THIRD_UNIT_DISCOUNT) * 100) / 100;
}

export function computeDuoCompareTotal(unitPrice: number): number {
  return Math.round(unitPrice * 2 * 100) / 100;
}

export function computeDuoPackTotal(unitPrice: number): number {
  return Math.round((unitPrice + computeSecondUnitPrice(unitPrice)) * 100) / 100;
}

export function computeTrioCompareTotal(unitPrice: number): number {
  return Math.round(unitPrice * 3 * 100) / 100;
}

export function computeTrioPackTotal(unitPrice: number): number {
  return Math.round(
    (unitPrice + computeSecondUnitPrice(unitPrice) + computeThirdUnitPrice(unitPrice)) * 100
  ) / 100;
}

export function computeBundleTotal(unitPrice: number, offer: BundleOffer): number {
  switch (offer) {
    case 'duo':
      return computeDuoPackTotal(unitPrice);
    case 'trio':
      return computeTrioPackTotal(unitPrice);
    default:
      return computeStandardTotal(unitPrice);
  }
}

export function computeBundleCompareTotal(unitPrice: number, offer: BundleOffer): number | null {
  switch (offer) {
    case 'duo':
      return computeDuoCompareTotal(unitPrice);
    case 'trio':
      return computeTrioCompareTotal(unitPrice);
    default:
      return null;
  }
}

export function computeDuoPackSavings(unitPrice: number): number {
  return Math.round(unitPrice * DUO_SECOND_UNIT_DISCOUNT * 100) / 100;
}

export function computeTrioPackSavings(unitPrice: number): number {
  return Math.round((computeTrioCompareTotal(unitPrice) - computeTrioPackTotal(unitPrice)) * 100) / 100;
}

export function computeBundleSavings(unitPrice: number, offer: BundleOffer): number {
  switch (offer) {
    case 'duo':
      return computeDuoPackSavings(unitPrice);
    case 'trio':
      return computeTrioPackSavings(unitPrice);
    default:
      return 0;
  }
}

export function buildBundleOrderItems(
  product: Product,
  offer: BundleOffer
): { product: Product; quantity: number; unitPrice?: number }[] {
  const price = product.price;

  if (offer === 'duo') {
    return [
      { product, quantity: 1, unitPrice: price },
      { product, quantity: 1, unitPrice: computeSecondUnitPrice(price) },
    ];
  }

  if (offer === 'trio') {
    return [
      { product, quantity: 1, unitPrice: price },
      { product, quantity: 1, unitPrice: computeSecondUnitPrice(price) },
      { product, quantity: 1, unitPrice: computeThirdUnitPrice(price) },
    ];
  }

  return [{ product, quantity: 1 }];
}

export function bundleOfferLabelKey(offer: BundleOffer): 'bundleStandardLabel' | 'bundleDuoLabel' | 'bundleTrioLabel' {
  switch (offer) {
    case 'duo':
      return 'bundleDuoLabel';
    case 'trio':
      return 'bundleTrioLabel';
    default:
      return 'bundleStandardLabel';
  }
}
