import { NextResponse } from 'next/server';
import { assertAdminAuthenticated } from '@/lib/admin/auth';
import { ADMIN_ORDER_STATUSES, type AdminOrderStatus } from '@/lib/admin/order-status';
import { deleteAdminOrder, updateAdminOrderStatus } from '@/lib/admin/orders';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await assertAdminAuthenticated();
    const { id } = await context.params;
    await deleteAdminOrder(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur';
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await assertAdminAuthenticated();
    const { id } = await context.params;
    const body = (await request.json()) as { status?: AdminOrderStatus };

    if (!body.status || !ADMIN_ORDER_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'Statut invalide.' }, { status: 400 });
    }

    await updateAdminOrderStatus(id, body.status);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur';
    if (message === 'Unauthorized') {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
