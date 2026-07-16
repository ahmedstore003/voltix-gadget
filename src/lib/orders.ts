import { supabase } from './supabase';
import { Product } from '@/context/CartContext';
import { LOCAL_PRODUCTS } from './products-data';
import { isUpsellCandidate, pickUpsellProduct } from './product-visibility';

export interface OrderRecord {
  id: string;
  customer_name: string;
  phone_number: string;
  city: string;
  address: string;
  total_price: number;
  upsell_added: boolean;
  status: string;
  created_at?: string;
}

export interface OrderItemRecord {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface OrderDetails {
  order: OrderRecord;
  items: OrderItemRecord[];
}

function isSupabaseReady(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
  );
}

async function attachProducts(items: OrderItemRecord[]): Promise<OrderItemRecord[]> {
  const productIds = [...new Set(items.map((item) => item.product_id))];

  if (!isSupabaseReady()) {
    return items.map((item) => ({
      ...item,
      product: LOCAL_PRODUCTS.find((p) => p.id === item.product_id),
    }));
  }

  const { data: products } = await supabase.from('products').select('*').in('id', productIds);

  const productMap = new Map<string, Product>();
  products?.forEach((product) => productMap.set(product.id, product as Product));

  return items.map((item) => ({
    ...item,
    product: productMap.get(item.product_id) ?? LOCAL_PRODUCTS.find((p) => p.id === item.product_id),
  }));
}

export async function fetchOrderDetails(orderId: string): Promise<OrderDetails | null> {
  if (!isSupabaseReady()) {
    return fetchLocalOrderDetails(orderId);
  }

  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return fetchLocalOrderDetails(orderId);
    }

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    if (itemsError || !items) {
      return null;
    }

    const itemsWithProducts = await attachProducts(items as OrderItemRecord[]);

    return {
      order: order as OrderRecord,
      items: itemsWithProducts,
    };
  } catch {
    return fetchLocalOrderDetails(orderId);
  }
}

function fetchLocalOrderDetails(orderId: string): OrderDetails | null {
  return null;
}

async function getCategoryUpsell(
  categoryId: string,
  excludeProductId: string
): Promise<Product | null> {
  const sameCategoryLocal = LOCAL_PRODUCTS.filter(
    (p) => p.category_id === categoryId && p.id !== excludeProductId
  );

  if (!isSupabaseReady()) {
    return pickUpsellProduct(sameCategoryLocal);
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .neq('id', excludeProductId);

    if (error || !data?.length) {
      return pickUpsellProduct(sameCategoryLocal);
    }

    return pickUpsellProduct(data as Product[]);
  } catch {
    return pickUpsellProduct(sameCategoryLocal);
  }
}

export async function resolveOrderUpsell(
  items: OrderItemRecord[],
  upsellAlreadyAdded: boolean
): Promise<Product | null> {
  if (upsellAlreadyAdded) return null;

  const purchasedIds = items.map((item) => item.product_id);
  const primaryItem = items[0];
  const primaryProduct = primaryItem?.product;

  if (primaryProduct?.category_id) {
    const categoryUpsell = await getCategoryUpsell(primaryProduct.category_id, primaryProduct.id);
    if (categoryUpsell && !purchasedIds.includes(categoryUpsell.id)) {
      return categoryUpsell;
    }
  }

  const generic = LOCAL_PRODUCTS.find(
    (product) => !purchasedIds.includes(product.id) && isUpsellCandidate(product)
  );

  if (generic) return generic;

  return LOCAL_PRODUCTS.find((product) => !purchasedIds.includes(product.id)) ?? null;
}

export async function applyOrderUpsell(
  orderId: string,
  currentTotal: number,
  upsellProduct: Product
): Promise<{ totalPrice: number }> {
  const updatedTotal = currentTotal + upsellProduct.price;

  if (!isSupabaseReady()) {
    return { totalPrice: updatedTotal };
  }

  const { error: orderError } = await supabase
    .from('orders')
    .update({ upsell_added: true, total_price: updatedTotal })
    .eq('id', orderId);

  if (orderError) throw orderError;

  const { error: itemError } = await supabase.from('order_items').insert([
    {
      order_id: orderId,
      product_id: upsellProduct.id,
      quantity: 1,
      price: upsellProduct.price,
    },
  ]);

  if (itemError) throw itemError;

  return { totalPrice: updatedTotal };
}

export function getThankYouPath(orderId: string): string {
  return `/thank-you?order=${encodeURIComponent(orderId)}`;
}

const ORDER_SNAPSHOT_PREFIX = 'voltix_order_';

export function persistOrderSnapshot(details: OrderDetails): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(`${ORDER_SNAPSHOT_PREFIX}${details.order.id}`, JSON.stringify(details));
}

export function readOrderSnapshot(orderId: string): OrderDetails | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(`${ORDER_SNAPSHOT_PREFIX}${orderId}`);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as OrderDetails;
  } catch {
    return null;
  }
}
