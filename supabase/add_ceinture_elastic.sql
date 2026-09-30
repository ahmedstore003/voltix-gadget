-- AtlasTrends — Ajout produit : Ceinture Élastique Homme sans Trou (landing /a7zima)
--
-- À EXÉCUTER dans l'éditeur SQL de Supabase (rôle postgres).
-- L'API anon est bloquée par RLS (42501), c'est normal : ce script contourne cela.
--
-- PRIX alignés sur l'offre /a7zima (source de vérité : window.OFFER du HTML) :
--   pack de 3 = 149 MAD  (barré 249 MAD)
--   prix unitaire  = 149 / 3 = 49.67 MAD
--   prix unitaire barré = 249 / 3 = 83.00 MAD
-- Ces valeurs correspondent exactement à ce qu'envoie le formulaire :
--   orders.total_price      = 149
--   order_items.quantity    = 3
--   order_items.price       = 49.67

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS bundle_duo_price NUMERIC(10, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS bundle_trio_price NUMERIC(10, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS default_lang_ar BOOLEAN DEFAULT FALSE;

INSERT INTO public.products (
    id, title_fr, title_ar, description_fr, description_ar,
    price, compare_at_price, bundle_duo_price, bundle_trio_price,
    image_urls, slug, category_id, is_trending, stock, default_lang_ar
)
VALUES (
    'e3333333-3333-4333-8333-333333333333',
    'Ceinture Élastique Homme sans Trou – Gris Liserés Bleus (pack de 3)',
    'سمطة رجالية رياضية مطاطية بلا ثقوب - 3 قطع',
    'Ceinture homme en tissu élastique stretch avec clip sans trous. Un réglage qui suit votre tour de taille naturellement, un style sport/casual qui passe partout. Vendu en pack de 3 ceintures à 149 DH au lieu de 249 DH.',
    'سمطة رجالية بقماش مطاطي مرن، نظام كليبس بدون ثقوب، مقاس واحد يناسب الجميع من 30 حتى 42. العرض: 3 قطع بـ 149 د.م بدل 249 د.م. توصيل مجاني والدفع عند الاستلام.',
    49.67,
    83.00,
    NULL,
    149.00,
    ARRAY['/lp-media/ceinture/hero.webp', '/a7zima/images/hero-banner.jpg'],
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

-- Vérification : doit renvoyer une ligne avec le pack de 3 à 149.00
SELECT id, slug, price, compare_at_price, bundle_trio_price, stock
FROM public.products
WHERE id = 'e3333333-3333-4333-8333-333333333333';
