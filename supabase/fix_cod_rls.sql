-- Fix RLS policies for COD checkout funnel (anon/authenticated)
-- Run in Supabase SQL Editor if checkout fails with RLS errors

DROP POLICY IF EXISTS "Allow public insert access to orders" ON public.orders;
DROP POLICY IF EXISTS "Allow public insert access to order_items" ON public.order_items;
DROP POLICY IF EXISTS "Allow public read access to categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;

CREATE POLICY "cod_public_insert_orders"
  ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "cod_public_select_orders"
  ON public.orders FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "cod_public_update_orders"
  ON public.orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "cod_public_insert_order_items"
  ON public.order_items FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "cod_public_select_order_items"
  ON public.order_items FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "cod_public_select_categories"
  ON public.categories FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "cod_public_select_products"
  ON public.products FOR SELECT TO anon, authenticated USING (true);

GRANT SELECT ON public.categories TO anon, authenticated;
GRANT SELECT ON public.products TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.orders TO anon, authenticated;
GRANT SELECT, INSERT ON public.order_items TO anon, authenticated;
