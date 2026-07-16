import { supabase } from './supabase';
import { Product } from '@/context/CartContext';
import { LOCAL_PRODUCTS } from './products-data';
import { normalizeMoroccanPhone } from './checkout-validation';
import {
  sanitizeAddress,
  sanitizeCustomerName,
  sanitizePhoneInput,
} from './sanitize';

export interface CreateOrderInput {
  customerName: string;
  phoneNumber: string;
  city: string;
  address: string;
  totalPrice: number;
  items: { product: Product; quantity: number; unitPrice?: number }[];
}

export interface CreateOrderResult {
  orderId: string;
  totalPrice: number;
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: string }).message);
  }
  return 'Unknown error';
}

/** Resolve product UUID in Supabase by slug so order_items FK always matches DB. */
export async function resolveProductIdForOrder(product: Product): Promise<string> {
  const { data, error } = await supabase
    .from('products')
    .select('id')
    .eq('slug', product.slug)
    .maybeSingle();

  if (!error && data?.id) {
    return data.id;
  }

  const localMatch = LOCAL_PRODUCTS.find((entry) => entry.slug === product.slug);
  return localMatch?.id ?? product.id;
}

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const customerName = sanitizeCustomerName(input.customerName);
  const phoneNumber = normalizeMoroccanPhone(sanitizePhoneInput(input.phoneNumber));
  const city = sanitizeCustomerName(input.city).slice(0, 100);
  const address = sanitizeAddress(input.address);

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        customer_name: customerName,
        phone_number: phoneNumber,
        city,
        address,
        total_price: input.totalPrice,
        status: 'pending',
        upsell_added: false,
      },
    ])
    .select('id, total_price')
    .single();

  if (orderError || !order) {
    throw new Error(getErrorMessage(orderError) || 'Order creation failed');
  }

  const orderItemsPayload = await Promise.all(
    input.items.map(async (item) => ({
      order_id: order.id,
      product_id: await resolveProductIdForOrder(item.product),
      quantity: item.quantity,
      price: item.unitPrice ?? item.product.price,
    }))
  );

  const { error: itemsError } = await supabase.from('order_items').insert(orderItemsPayload);

  if (itemsError) {
    throw new Error(getErrorMessage(itemsError));
  }

  return {
    orderId: order.id,
    totalPrice: Number(order.total_price ?? input.totalPrice),
  };
}
