import { NextResponse } from 'next/server';
import { assertAdminAuthenticated } from '@/lib/admin/auth';
import { fetchAdminOrders } from '@/lib/admin/orders';

export async function GET() {
  try {
    await assertAdminAuthenticated();
    const orders = await fetchAdminOrders();
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
