import { Product } from '@/context/CartContext';
import { isRealImageUrl } from '@/lib/images';

/** Produits réservés à l'upsell post-commande — exclus du catalogue catégories. */
export function isUpsellOnlyProduct(product: Pick<Product, 'slug'>): boolean {
  return product.slug.includes('-offre');
}

export function isCatalogProduct(product: Pick<Product, 'slug'>): boolean {
  return !isUpsellOnlyProduct(product);
}

/** Exclut les placeholders sans vraie photo (/products/… ou URL). */
export function hasRealProductImage(product: Pick<Product, 'image_urls'>): boolean {
  return product.image_urls.some((url) => isRealImageUrl(url));
}

export function isVisibleCatalogProduct(product: Product): boolean {
  return isCatalogProduct(product) && hasRealProductImage(product);
}

const UPSELL_SLUG_HINTS = ['-offre', 'dock', 'serum', 'organizer', 'peeler'] as const;

export function isUpsellCandidate(product: Pick<Product, 'slug'>): boolean {
  return UPSELL_SLUG_HINTS.some((hint) => product.slug.includes(hint));
}

export function pickUpsellProduct(products: Product[]): Product | null {
  return (
    products.find((p) => p.slug.includes('-offre')) ??
    products.find((p) => isUpsellCandidate(p)) ??
    products[0] ??
    null
  );
}
