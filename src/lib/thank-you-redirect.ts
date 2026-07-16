'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@/context/CartContext';
import { getThankYouPath, persistOrderSnapshot, type OrderDetails } from '@/lib/orders';

interface CompletedOrderItem {
  product: Product;
  quantity: number;
  unitPrice?: number;
}

interface CompletedOrderInput {
  orderId: string;
  totalPrice: number;
  customerName: string;
  phoneNumber: string;
  city: string;
  address: string;
  items: CompletedOrderItem[];
}

export function redirectToThankYou(
  router: ReturnType<typeof useRouter>,
  input: CompletedOrderInput
): void {
  const details: OrderDetails = {
    order: {
      id: input.orderId,
      customer_name: input.customerName,
      phone_number: input.phoneNumber,
      city: input.city,
      address: input.address,
      total_price: input.totalPrice,
      upsell_added: false,
      status: 'pending',
    },
    items: input.items.map((item) => ({
      id: `${input.orderId}-${item.product.id}`,
      order_id: input.orderId,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.unitPrice ?? item.product.price,
      product: item.product,
    })),
  };

  persistOrderSnapshot(details);
  router.push(getThankYouPath(input.orderId));
}
