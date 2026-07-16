import 'server-only';

import { AdminOrderStatus, adminStatusToDb, dbStatusToAdmin } from '@/lib/admin/order-status';
import { isSupabaseAdminReady, supabaseAdmin } from '@/lib/supabase-admin';

export interface AdminOrderLineItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  slug?: string;
  imageUrl?: string;
}

export interface AdminOrderRow {
  id: string;
  createdAt: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  city: string;
  status: AdminOrderStatus;
  totalPrice: number;
  items: AdminOrderLineItem[];
}

export const MOCK_ADMIN_ORDERS: AdminOrderRow[] = [
  {
    id: 'a1000001-0000-4000-8000-000000000001',
    createdAt: '2026-06-28T09:15:00.000Z',
    customerName: 'Youssef Benali',
    phoneNumber: '+212612345678',
    address: '12 Rue Ibn Khaldoun, Hay Riad',
    city: 'Rabat',
    status: 'nouveau',
    totalPrice: 200,
    items: [{ productName: 'Miroir mural design 90 × 40 cm', quantity: 1, unitPrice: 200, slug: 'miroir-mural-design' }],
  },
  {
    id: 'a1000002-0000-4000-8000-000000000002',
    createdAt: '2026-06-28T10:42:00.000Z',
    customerName: 'Sara El Amrani',
    phoneNumber: '+212661234567',
    address: '45 Bd Zerktouni, Appartement 3',
    city: 'Casablanca',
    status: 'confirme',
    totalPrice: 499,
    items: [{ productName: 'Coffret The Ritual of Ayurveda', quantity: 1, unitPrice: 499 }],
  },
  {
    id: 'a1000003-0000-4000-8000-000000000003',
    createdAt: '2026-06-27T16:20:00.000Z',
    customerName: 'Karim Tazi',
    phoneNumber: '+212698765432',
    address: '8 Avenue Mohammed V',
    city: 'Marrakech',
    status: 'expedie',
    totalPrice: 370,
    items: [
      { productName: 'Mini Blender Portable Rechargeable', quantity: 1, unitPrice: 150, slug: 'mini-blender-portable-rechargeable' },
      { productName: 'Distributeur mural multifonction pour cuisine', quantity: 1, unitPrice: 220, slug: 'distributeur-mural-cuisine-multifonction' },
    ],
  },
  {
    id: 'a1000004-0000-4000-8000-000000000004',
    createdAt: '2026-06-27T11:05:00.000Z',
    customerName: 'Nadia Berrada',
    phoneNumber: '+212612998877',
    address: 'Lotissement Al Amal, Villa 7',
    city: 'Tanger',
    status: 'livre',
    totalPrice: 220,
    items: [{ productName: 'Masseur de nuque et épaules chauffant', quantity: 1, unitPrice: 220 }],
  },
  {
    id: 'a1000005-0000-4000-8000-000000000005',
    createdAt: '2026-06-26T14:33:00.000Z',
    customerName: 'Omar Idrissi',
    phoneNumber: '+212677112233',
    address: '23 Rue Allal Ben Abdellah',
    city: 'Fès',
    status: 'rto',
    totalPrice: 200,
    items: [{ productName: 'Lampe LED avec ventilateur multifonction', quantity: 1, unitPrice: 200 }],
  },
];

type DbOrder = {
  id: string;
  created_at: string;
  customer_name: string;
  phone_number: string;
  city: string;
  address: string;
  total_price: number;
  status: string;
};

type DbProductJoin = {
  title_fr: string;
  slug: string;
  image_urls: string[] | null;
};

type DbOrderItemRow = {
  order_id: string;
  quantity: number;
  price: number;
  product: DbProductJoin | DbProductJoin[] | null;
};

function getProductJoin(product: DbOrderItemRow['product']): DbProductJoin | null {
  if (!product) return null;
  if (Array.isArray(product)) return product[0] ?? null;
  return product;
}

function getProductTitle(product: DbOrderItemRow['product']): string {
  return getProductJoin(product)?.title_fr ?? 'Produit non identifié';
}

function mapDbOrders(orders: DbOrder[], items: DbOrderItemRow[]): AdminOrderRow[] {
  const itemsByOrder = new Map<string, AdminOrderLineItem[]>();

  for (const item of items) {
    const list = itemsByOrder.get(item.order_id) ?? [];
    const product = getProductJoin(item.product);
    list.push({
      productName: getProductTitle(item.product),
      quantity: item.quantity,
      unitPrice: Number(item.price),
      slug: product?.slug,
      imageUrl: product?.image_urls?.[0],
    });
    itemsByOrder.set(item.order_id, list);
  }

  return orders.map((order) => ({
    id: order.id,
    createdAt: order.created_at,
    customerName: order.customer_name,
    phoneNumber: order.phone_number,
    address: order.address,
    city: order.city,
    status: dbStatusToAdmin(order.status),
    totalPrice: Number(order.total_price),
    items: itemsByOrder.get(order.id) ?? [],
  }));
}

export async function fetchAdminOrders(): Promise<AdminOrderRow[]> {
  if (!isSupabaseAdminReady()) {
    return MOCK_ADMIN_ORDERS;
  }

  try {
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from('orders')
      .select('id, created_at, customer_name, phone_number, city, address, total_price, status')
      .order('created_at', { ascending: false });

    if (ordersError || !orders?.length) {
      return MOCK_ADMIN_ORDERS;
    }

    const orderIds = orders.map((order) => order.id);
    const { data: items, error: itemsError } = await supabaseAdmin
      .from('order_items')
      .select('order_id, quantity, price, product:products(title_fr, slug, image_urls)')
      .in('order_id', orderIds);

    if (itemsError) {
      return mapDbOrders(orders as DbOrder[], []);
    }

    return mapDbOrders(orders as DbOrder[], (items ?? []) as DbOrderItemRow[]);
  } catch {
    return MOCK_ADMIN_ORDERS;
  }
}

export async function updateAdminOrderStatus(
  orderId: string,
  status: AdminOrderStatus
): Promise<void> {
  const dbStatus = adminStatusToDb(status);

  if (!isSupabaseAdminReady()) {
    const mockOrder = MOCK_ADMIN_ORDERS.find((order) => order.id === orderId);
    if (mockOrder) mockOrder.status = status;
    return;
  }

  const { error } = await supabaseAdmin
    .from('orders')
    .update({ status: dbStatus })
    .eq('id', orderId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteAdminOrder(orderId: string): Promise<void> {
  if (!isSupabaseAdminReady()) {
    const index = MOCK_ADMIN_ORDERS.findIndex((order) => order.id === orderId);
    if (index === -1) {
      throw new Error('Commande introuvable.');
    }
    MOCK_ADMIN_ORDERS.splice(index, 1);
    return;
  }

  const { error } = await supabaseAdmin.from('orders').delete().eq('id', orderId);

  if (error) {
    throw new Error(error.message);
  }
}
