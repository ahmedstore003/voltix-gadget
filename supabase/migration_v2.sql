-- Voltix General Store Database Schema Migration v2
-- Clean up existing tables to ensure a clean slate
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_fr VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_fr VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    description_fr TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    compare_at_price NUMERIC(10, 2),
    image_urls TEXT[] NOT NULL, -- Array of image placeholders/paths
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    is_trending BOOLEAN NOT NULL DEFAULT FALSE,
    stock INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'shipped', 'delivered')),
    upsell_added BOOLEAN NOT NULL DEFAULT FALSE
);

-- 4. Create order_items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Configure RLS Policies
-- Public read access to categories and products
CREATE POLICY "Allow public select categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public select products" ON public.products FOR SELECT USING (true);

-- Public insert/select/update for checkout funnel
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update orders" ON public.orders FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public select orders" ON public.orders FOR SELECT USING (true);

CREATE POLICY "Allow public insert order_items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select order_items" ON public.order_items FOR SELECT USING (true);

-- ==========================================================
-- SEED DATA
-- ==========================================================

-- Insert Categories and save their IDs in temp variables
-- Category 1: Gadgets
INSERT INTO public.categories (id, name_fr, name_ar, slug)
VALUES ('77a6f958-3d12-40f4-b258-450f38b1f8fb', 'Gadgets', 'أجهزة ذكية', 'gadgets')
ON CONFLICT (slug) DO UPDATE SET name_fr = EXCLUDED.name_fr, name_ar = EXCLUDED.name_ar;

-- Category 2: Cosmétique
INSERT INTO public.categories (id, name_fr, name_ar, slug)
VALUES ('55b6f958-3d12-40f4-b258-450f38b1f8fc', 'Cosmétique', 'مستحضرات تجميل', 'cosmetique')
ON CONFLICT (slug) DO UPDATE SET name_fr = EXCLUDED.name_fr, name_ar = EXCLUDED.name_ar;

-- Category 3: Trends
INSERT INTO public.categories (id, name_fr, name_ar, slug)
VALUES ('33c6f958-3d12-40f4-b258-450f38b1f8fd', 'Trends', 'صيحات الموضة', 'trends')
ON CONFLICT (slug) DO UPDATE SET name_fr = EXCLUDED.name_fr, name_ar = EXCLUDED.name_ar;

-- Category 4: Cuisine
INSERT INTO public.categories (id, name_fr, name_ar, slug)
VALUES ('11d6f958-3d12-40f4-b258-450f38b1f8fe', 'Cuisine', 'مطبخ', 'cuisine')
ON CONFLICT (slug) DO UPDATE SET name_fr = EXCLUDED.name_fr, name_ar = EXCLUDED.name_ar;


-- Insert Products for Categories

-- CATEGORY 1: GADGETS
-- Product 1: Voltix Horizon Smart Ring
INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, image_urls, slug, category_id, is_trending, stock)
VALUES (
    'a1111111-1111-1111-1111-111111111111',
    'Voltix Horizon Smart Ring',
    'حلقة فولتكس هورايزون الذكية',
    'Une merveille d''ingénierie en titane de grade 5. Suivez votre santé, optimisez votre sommeil et contrôlez vos appareils avec élégance.',
    'تحفة هندسية مصنوعة من التيتانيوم عالي الجودة. تتبع صحتك، حسن نومك، وتحكم في أجهزتك بكل أناقة وفخامة.',
    399.00,
    799.00,
    ARRAY['ring_main', 'ring_sensors', 'ring_hand'],
    'voltix-horizon-ring',
    '77a6f958-3d12-40f4-b258-450f38b1f8fb',
    TRUE,
    15
) ON CONFLICT (slug) DO NOTHING;

-- Product 2: Voltix Charging Dock Pro (Companion Upsell)
INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, image_urls, slug, category_id, is_trending, stock)
VALUES (
    'a2222222-2222-2222-2222-222222222222',
    'Voltix Charging Dock Pro',
    'قاعدة الشحن فولتكس برو',
    'Le compagnon de charge idéal pour votre bague Voltix. Station magnétique en aluminium brossé offrant une recharge rapide en 30 minutes.',
    'قاعدة الشحن المغناطيسية السريعة والرفيق المثالي لحلقة فولتكس. مصنوعة من الألمنيوم وتوفر شحنًا كاملاً في 30 دقيقة.',
    149.00,
    299.00,
    ARRAY['charger_main', 'charger_detailed'],
    'voltix-charging-dock',
    '77a6f958-3d12-40f4-b258-450f38b1f8fb',
    FALSE,
    30
) ON CONFLICT (slug) DO NOTHING;


-- CATEGORY 2: COSMÉTIQUE
-- Product 1: GlowSkin LED Therapy Mask
INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, image_urls, slug, category_id, is_trending, stock)
VALUES (
    'b1111111-1111-1111-1111-111111111111',
    'GlowSkin LED Therapy Mask',
    'قناع العلاج بالضوء غلو سكين',
    'Régénérez votre peau à domicile avec la thérapie par lumière LED médicale. 7 couleurs pour traiter les rides, l''acné et l''éclat.',
    'جددي بشرتك في المنزل باستخدام قناع العلاج بضوء LED الطبي. يحتوي على 7 ألوان لعلاج التجاعيد، حب الشباب، وإعادة النضارة لبشرتك.',
    499.00,
    899.00,
    ARRAY['mask_main', 'mask_usage', 'mask_colors'],
    'glowskin-led-mask',
    '55b6f958-3d12-40f4-b258-450f38b1f8fc',
    TRUE,
    12
) ON CONFLICT (slug) DO NOTHING;

-- Product 2: GlowSkin Hyaluronic Serum (Companion Upsell)
INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, image_urls, slug, category_id, is_trending, stock)
VALUES (
    'b2222222-2222-2222-2222-222222222222',
    'GlowSkin Hyaluronic Serum',
    'سيروم الهيالورونيك غلو سكين',
    'Sérum hydratant ultra-concentré à l''acide hyaluronique pur. Répare et repulpe instantanément après votre séance de masque LED.',
    'سيروم مرطب فائق التركيز بحمض الهيالورونيك النقي. يعيد حيوية البشرة ويرطبها بعمق بعد استخدام قناع LED.',
    129.00,
    259.00,
    ARRAY['serum_main', 'serum_box'],
    'glowskin-serum',
    '55b6f958-3d12-40f4-b258-450f38b1f8fc',
    FALSE,
    25
) ON CONFLICT (slug) DO NOTHING;


-- CATEGORY 3: TRENDS
-- Product 1: AeroFlex Anti-Gravity Backpack
INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, image_urls, slug, category_id, is_trending, stock)
VALUES (
    'c1111111-1111-1111-1111-111111111111',
    'AeroFlex Anti-Gravity Backpack',
    'حقيبة الظهر أيروفليكس المضادة للجاذبية',
    'Le premier sac à dos ergonomique doté d''un système de suspension pneumatique breveté qui réduit la charge ressentie de 50%. Idéal voyage et travail.',
    'أول حقيبة ظهر مريحة تتميز بنظام تعليق هوائي حاصل على براءة اختراع يقلل الوزن المحسوس بنسبة 50%. مثالية للسفر والعمل.',
    349.00,
    699.00,
    ARRAY['backpack_main', 'backpack_features', 'backpack_model'],
    'aeroflex-backpack',
    '33c6f958-3d12-40f4-b258-450f38b1f8fd',
    TRUE,
    8
) ON CONFLICT (slug) DO NOTHING;

-- Product 2: AeroFlex Travel Organizer (Companion Upsell)
INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, image_urls, slug, category_id, is_trending, stock)
VALUES (
    'c2222222-2222-2222-2222-222222222222',
    'AeroFlex Travel Organizer',
    'منظم السفر أيروفليكس',
    'Pochette premium imperméable avec compartiments intelligents pour organiser vos câbles, passeport, et chargeurs en déplacement.',
    'حقيبة تنظيم السفر المقاومة للماء مع جيوب ذكية لتنظيم الكابلات، جواز السفر، والشواحن بسهولة أثناء تنقلك.',
    99.00,
    199.00,
    ARRAY['organizer_main', 'organizer_detailed'],
    'aeroflex-organizer',
    '33c6f958-3d12-40f4-b258-450f38b1f8fd',
    FALSE,
    40
) ON CONFLICT (slug) DO NOTHING;


-- CATEGORY 4: CUISINE
-- Product 1: ChefPress 5-in-1 Vegetable Chopper
INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, image_urls, slug, category_id, is_trending, stock)
VALUES (
    'd1111111-1111-1111-1111-111111111111',
    'ChefPress 5-in-1 Vegetable Chopper',
    'مفرمة الخضار شيف بريس 5 في 1',
    'Gagnez un temps précieux en cuisine. Découpez, râpez, et émincez tous vos légumes en une seule pression avec des lames en acier inoxydable.',
    'وفر وقتك الثمين في المطبخ. قطعي، ابشري، وافرمي جميع خضرواتك بضغطة واحدة وبفضل شفرات الفولاذ المقاوم للصدأ الحادة.',
    249.00,
    499.00,
    ARRAY['chopper_main', 'chopper_accessories', 'chopper_action'],
    'chefpress-chopper',
    '11d6f958-3d12-40f4-b258-450f38b1f8fe',
    TRUE,
    20
) ON CONFLICT (slug) DO NOTHING;

-- Product 2: ChefPress Stainless Steel Peeler (Companion Upsell)
INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, image_urls, slug, category_id, is_trending, stock)
VALUES (
    'd2222222-2222-2222-2222-222222222222',
    'ChefPress Stainless Steel Peeler',
    'مقشرة شيف بريس المصنوعة من الفولاذ',
    'Éplucheur ergonomique ultra-tranchant. Convient à tous les fruits et légumes, y compris les peaux dures.',
    'مقشرة مريحة وحادة للغاية مصنوعة من الفولاذ المقاوم للصدأ. مناسبة لجميع أنواع الفواكه والخضروات بسهولة تامة.',
    59.00,
    119.00,
    ARRAY['peeler_main', 'peeler_detailed'],
    'chefpress-peeler',
    '11d6f958-3d12-40f4-b258-450f38b1f8fe',
    FALSE,
    50
) ON CONFLICT (slug) DO NOTHING;
