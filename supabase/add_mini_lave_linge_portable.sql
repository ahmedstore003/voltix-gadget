-- Voltix General Store — Ajout produit : Mini Machine à Laver Portable
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS bundle_duo_price NUMERIC(10, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS bundle_trio_price NUMERIC(10, 2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS default_lang_ar BOOLEAN DEFAULT FALSE;

INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, bundle_duo_price, bundle_trio_price, image_urls, slug, category_id, is_trending, stock, default_lang_ar)
VALUES (
    'e1111111-1111-1111-1111-111111111111',
    'Mini Machine à Laver Portable',
    'غسالة صغيرة محمولة',
    'Petite machine à laver… mais un vrai gain de temps ! 😍

❌ Plus besoin d''attendre d''avoir beaucoup de linge pour faire une machine.

❌ Pas besoin d''utiliser une grande machine pour laver les sous-vêtements, chaussettes et vêtements de bébé.

✅ Cette mini machine à laver portable vous permet de laver votre petit linge facilement et sans complication !

💧 Compacte & portable — emportez-la partout où vous voulez
🧼 Facile à utiliser & à nettoyer
🏠 Idéale pour la maison, l''appartement, les voyages et les étudiants
👕 Parfaite pour les petites lessives du quotidien

🔥 PRIX : SEULEMENT 259 DH

🚚 Livraison à domicile
💵 Paiement à la livraison

👉 Commandez maintenant et simplifiez votre quotidien !',
    '🧺 غسالة صغيرة… ولكن كتسهل عليك الحياة بزاف! 😍

❌ ما تبقاش تجمع الملابس الصغيرة باش تغسلهم
❌ ما تحتاجش غسالة كبيرة باش تغسل الملابس الداخلية، الجوارب وملابس الأطفال
✅ هاد الغسالة المحمولة كتخليك تغسل بسهولة وبلا تعقيدات!

💧 صغيرة ومحمولة — خدها معاك فين ما بغيتي
🧼 سهلة التنظيف والاستعمال
🏠 مثالية للدار، الشقة، السفر وحتى السكن الجامعي
👕 مناسبة للملابس الخفيفة والغسيل اليومي

🔥 الثمن: غير 259 DH

💵 الأداء عند الاستلام',
    259.00,
    349.00,
    479.00,
    689.00,
    ARRAY['/products/mini-lave-linge-1.webp', '/products/mini-lave-linge-2.webp', '/products/mini-lave-linge-3.webp'],
    'mini-lave-linge-portable',
    '77a6f958-3d12-40f4-b258-450f38b1f8fb',
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