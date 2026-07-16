import type { Language } from '@/constants/translations';
import type { Product } from '@/context/CartContext';

export function productTitle(product: Product, language: Language): string {
  return language === 'fr' ? product.title_fr : product.title_ar;
}

export function productDescription(product: Product, language: Language): string {
  return language === 'fr' ? product.description_fr : product.description_ar;
}

export function categoryName(
  nameFr: string,
  nameAr: string,
  language: Language
): string {
  return language === 'fr' ? nameFr : nameAr;
}
