-- AtlasTrends — Ajout produit : Lampe de Nuit Musicale en Spirale avec Lapins Tournants
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS bundle_duo_price NUMERIC(10, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS bundle_trio_price NUMERIC(10, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS default_lang_ar BOOLEAN DEFAULT FALSE;

INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, bundle_duo_price, bundle_trio_price, image_urls, slug, category_id, is_trending, stock, default_lang_ar)
VALUES (
    'e2222222-2222-2222-2222-222222222222',
    'Lampe de Nuit Musicale en Spirale avec Lapins Tournants',
    'مصباح ليلي موسيقي على شكل دوامة مع أرانب دوارة',
    'Une lampe de nuit musicale en spirale envoûtante, avec des lapins qui tournent en douceur. Un vrai spectacle apaisant pour la chambre des petits… et des grands ! 😍

✨ Design en spirale avec lapins rotatifs
🎵 Projecteur musical avec sons relaxants
🌙 Idéale comme veilleuse pour bébé et enfants
🟢 Économique, douce et apaisante pour le sommeil

✅ Stock disponible
🔥 Demande élevée — s''écoule vite
🚚 Livraison rapide à domicile
🛡️ Garantie qualité
💵 Paiement à la livraison

👉 Commandez maintenant et transformez vos nuits !',
    '✨ مصباح ليلي موسيقي على شكل دوامة مع أرانب دوارة، كيخلي جو ساحر وهادئ في الغرفة! 😍

🎵 شكل دوامة مع أرانب كيدورو بنعومة
✨ إضاءة ناعمة مريحة للعينين
🌙 مثالي لغرفة الأطفال والرضّع
🔋 اقتصادي في الاستهلاك

✅ متوفر في المخزون
🔥 طلب مرتفع — كيسالي بسرعة
🚚 توصيل سريع حتى باب الدار
🛡️ ضمان الجودة
💵 دفع عند الاستلام

👉 اطلب دابا وبدل الليالي ديالك !',
    289.00,
    389.00,
    539.00,
    779.00,
    ARRAY['/products/lampe-nuit-1.webp', '/products/lampe-nuit-2.webp', '/products/lampe-nuit-3.webp'],
    'lampe-nuit-lapins-tournants',
    '9a9a923a-b213-43f2-8ade-7c52b82724d1',
    FALSE,
    10,
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