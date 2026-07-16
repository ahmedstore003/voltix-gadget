import 'server-only';

import { unstable_cache } from 'next/cache';
import { REVALIDATE_SECONDS } from '@/lib/cache';
import {
  getTrendingProducts as fetchTrendingProducts,
  getCatalogProducts as fetchCatalogProducts,
  getProductBySlug as fetchProductBySlug,
  getCategoryBySlug as fetchCategoryBySlug,
  getProductsByCategory as fetchProductsByCategory,
} from '@/lib/products';

export async function getTrendingProducts() {
  return unstable_cache(fetchTrendingProducts, ['products-trending'], {
    revalidate: REVALIDATE_SECONDS,
  })();
}

export async function getCatalogProducts() {
  return unstable_cache(fetchCatalogProducts, ['products-catalog-v1'], {
    revalidate: REVALIDATE_SECONDS,
  })();
}

export async function getProductBySlug(slug: string) {
  return unstable_cache(() => fetchProductBySlug(slug), ['product-by-slug-v2', slug], {
    revalidate: REVALIDATE_SECONDS,
  })();
}

export async function getCategoryBySlug(slug: string) {
  return unstable_cache(() => fetchCategoryBySlug(slug), ['category-by-slug', slug], {
    revalidate: REVALIDATE_SECONDS,
  })();
}

export async function getProductsByCategory(categoryId: string) {
  return unstable_cache(
    () => fetchProductsByCategory(categoryId),
    ['products-by-category-v2', categoryId],
    { revalidate: REVALIDATE_SECONDS }
  )();
}

export { LOCAL_CATEGORIES, LOCAL_PRODUCTS, type Category } from '@/lib/products-data';
