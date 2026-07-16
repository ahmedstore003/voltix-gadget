-- Extend order statuses for admin dashboard (RTO support)
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check
  CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'rto'));

-- Allow admin dashboard to delete orders (order_items cascade)
DROP POLICY IF EXISTS "cod_public_delete_orders" ON public.orders;
CREATE POLICY "cod_public_delete_orders"
  ON public.orders FOR DELETE TO anon, authenticated USING (true);

GRANT DELETE ON public.orders TO anon, authenticated;
