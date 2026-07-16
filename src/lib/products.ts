import 'server-only';

import { supabaseServer, isSupabaseConfigured } from './supabase-server';
import { Product } from '@/context/CartContext';
import { LOCAL_CATEGORIES, LOCAL_PRODUCTS, type Category } from './products-data';
import { getCategorySlugCandidates, getEquivalentCategoryIds } from './category-ids';
import { isCatalogProduct, isVisibleCatalogProduct, pickUpsellProduct } from './product-visibility';
import { sortCategoryProducts } from './category-sort';

export type { Category } from './products-data';
export { LOCAL_CATEGORIES, LOCAL_PRODUCTS } from './products-data';

// Helper to check if Supabase is connected and working
const isSupabaseReady = () => isSupabaseConfigured();

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseReady()) return LOCAL_CATEGORIES;
  
  try {
    const { data, error } = await supabaseServer
      .from('categories')
      .select('*')
      .order('name_fr', { ascending: true });
      
    if (error || !data || data.length === 0) {
      return LOCAL_CATEGORIES;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to local categories:', err);
    return LOCAL_CATEGORIES;
  }
}

/**
 * Fetch a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const local = LOCAL_CATEGORIES.find((c) => c.slug === slug) ?? null;

  if (!isSupabaseReady()) {
    return local;
  }

  try {
    for (const candidate of getCategorySlugCandidates(slug)) {
      const { data, error } = await supabaseServer
        .from('categories')
        .select('*')
        .eq('slug', candidate)
        .maybeSingle();

      if (!error && data) {
        return {
          ...data,
          slug: local?.slug ?? slug,
          name_ar: local?.name_ar ?? data.name_ar,
        };
      }
    }

    return local;
  } catch (err) {
    return local;
  }
}

/**
 * Fetch all products
 */
export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseReady()) return LOCAL_PRODUCTS;

  try {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*');

    if (error || !data || data.length === 0) {
      return LOCAL_PRODUCTS;
    }
    return data;
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to local products:', err);
    return LOCAL_PRODUCTS;
  }
}

/**
 * Fetch all visible catalog products (homepage & full catalog).
 */
export async function getCatalogProducts(): Promise<Product[]> {
  const localProducts = LOCAL_PRODUCTS.filter(isVisibleCatalogProduct);

  if (!isSupabaseReady()) {
    return sortCategoryProducts(localProducts, 'newest');
  }

  try {
    const { data, error } = await supabaseServer.from('products').select('*');

    if (error || !data?.length) {
      return sortCategoryProducts(localProducts, 'newest');
    }

    const remoteProducts = (data as Product[]).filter(isVisibleCatalogProduct);
    return sortCategoryProducts(mergeProductsBySlug(remoteProducts, localProducts), 'newest');
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to local catalog products:', err);
    return sortCategoryProducts(localProducts, 'newest');
  }
}

/**
 * Fetch trending products
 */
export async function getTrendingProducts(): Promise<Product[]> {
  if (!isSupabaseReady()) {
    return LOCAL_PRODUCTS.filter((p) => p.is_trending);
  }

  try {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .eq('is_trending', true);

    if (error || !data || data.length === 0) {
      return LOCAL_PRODUCTS.filter((p) => p.is_trending);
    }
    return data;
  } catch (err) {
    return LOCAL_PRODUCTS.filter((p) => p.is_trending);
  }
}

function filterCategoryCatalog(products: Product[], categoryIds: string[]): Product[] {
  return products.filter(
    (product) =>
      Boolean(product.category_id) &&
      categoryIds.includes(product.category_id!) &&
      isVisibleCatalogProduct(product)
  );
}

function mergeProductsBySlug(primary: Product[], secondary: Product[]): Product[] {
  const bySlug = new Map<string, Product>();
  for (const product of secondary) bySlug.set(product.slug, product);
  for (const product of primary) bySlug.set(product.slug, product);
  return Array.from(bySlug.values());
}

/**
 * Fetch products in a specific category
 */
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const categoryIds = getEquivalentCategoryIds(categoryId);
  const localProducts = filterCategoryCatalog(LOCAL_PRODUCTS, categoryIds);

  if (!isSupabaseReady()) {
    return localProducts;
  }

  try {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .in('category_id', categoryIds);

    if (error || !data?.length) {
      return localProducts;
    }

    const remoteProducts = (data as Product[]).filter(isVisibleCatalogProduct);
    return mergeProductsBySlug(remoteProducts, localProducts);
  } catch (err) {
    return localProducts;
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const findCatalogProduct = () => {
    const product = LOCAL_PRODUCTS.find((p) => p.slug === slug);
    return product && isCatalogProduct(product) ? product : null;
  };

  if (!isSupabaseReady()) {
    return findCatalogProduct();
  }

  try {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return findCatalogProduct();
    }
    return isCatalogProduct(data) ? data : null;
  } catch (err) {
    return findCatalogProduct();
  }
}

/**
 * Fetch all product slugs — used by generateStaticParams at build time.
 */
export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  const catalogSlugs = (products: Product[]) =>
    products.filter(isCatalogProduct).map((product) => ({ slug: product.slug }));

  if (!isSupabaseReady()) {
    return catalogSlugs(LOCAL_PRODUCTS);
  }

  try {
    const { data, error } = await supabaseServer.from('products').select('slug');

    if (error || !data?.length) {
      return catalogSlugs(LOCAL_PRODUCTS);
    }

    return data.filter((row) => isCatalogProduct(row)).map((row) => ({ slug: row.slug }));
  } catch {
    return catalogSlugs(LOCAL_PRODUCTS);
  }
}

/**
 * Fetch all category slugs — used by generateStaticParams at build time.
 */
export async function getAllCategorySlugs(): Promise<{ slug: string }[]> {
  if (!isSupabaseReady()) {
    return LOCAL_CATEGORIES.map((category) => ({ slug: category.slug }));
  }

  try {
    const { data, error } = await supabaseServer.from('categories').select('slug');

    if (error || !data?.length) {
      return LOCAL_CATEGORIES.map((category) => ({ slug: category.slug }));
    }

    return data.map((row) => ({ slug: row.slug }));
  } catch {
    return LOCAL_CATEGORIES.map((category) => ({ slug: category.slug }));
  }
}

/**
 * Intelligently suggests an upsell item belonging to the same category as the purchased item
 */
export async function getCategoryUpsell(categoryId: string, excludeProductId: string): Promise<Product | null> {
  const sameCategoryLocal = LOCAL_PRODUCTS.filter(
    (p) => p.category_id === categoryId && p.id !== excludeProductId
  );

  if (!isSupabaseReady()) {
    return pickUpsellProduct(sameCategoryLocal);
  }

  try {
    const { data, error } = await supabaseServer
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .neq('id', excludeProductId);

    if (error || !data || data.length === 0) {
      return pickUpsellProduct(sameCategoryLocal);
    }

    return pickUpsellProduct(data as Product[]);
  } catch (err) {
    return pickUpsellProduct(sameCategoryLocal);
  }
}
