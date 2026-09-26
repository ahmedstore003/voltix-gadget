-- AtlasTrends — Ajout produit : Ceinture Élastique Homme sans Trou (page de vente /lp)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS bundle_duo_price NUMERIC(10, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS bundle_trio_price NUMERIC(10, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS default_lang_ar BOOLEAN DEFAULT FALSE;

INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, bundle_duo_price, bundle_trio_price, image_urls, slug, category_id, is_trending, stock, default_lang_ar)
VALUES (
    'e3333333-3333-4333-8333-333333333333',
    'Ceinture Élastique Homme sans Trou – Gris Liserés Bleus',
    'سمطة رجالية رياضية مطاطية بلا ثقوب',
    'Ceinture homme en tissu élastique stretch avec clip sans trous. Un réglage qui suit votre tour de taille naturellement, un style sport/casual qui passe partout.',
    'سمطة رجالية بقماش مطاطي مرن، نظام كليبس بدون ثقوب، مقاس واحد يناسب الجميع من 30 حتى 42. لوك كاجوال/سبور رمادي مع خطوط زرقاء.',
    149.00,
    249.00,
    279.00,
    399.00,
    ARRAY['/lp-media/ceinture/hero.webp'],
    'ceinture-elastic-sport-lp',
    '9a9a923a-b213-43f2-8ade-7c52b82724d1',
    FALSE,
    30,
    TRUE
) ON CONFLICT (id) DO UPDATE SET
    title_fr = EXCLUDED.title_fr,
    title_ar = EXCLUDED.title_ar,
    description_fr = EXCLUDED.description_fr,
    description_ar = EXCLUDED.description_ar,
    price = EXCLUDED.price,
    compare_at_price = EXCLUDED.compare_at_price,
    bundle_duo_price = EXCLUDED.bundle_duo_price,
    bundle_trio_price = EXCLUDED.bundle_trio_price,
    image_urls = EXCLUDED.image_urls,
    slug = EXCLUDED.slug,
    category_id = EXCLUDED.category_id,
    is_trending = EXCLUDED.is_trending,
    stock = EXCLUDED.stock,
    default_lang_ar = EXCLUDED.default_lang_ar;