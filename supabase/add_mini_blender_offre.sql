-- Voltix General Store — Ajout upsell : Mini Blender Portable Rechargeable (Offre)
INSERT INTO public.products (id, title_fr, title_ar, description_fr, description_ar, price, compare_at_price, image_urls, slug, category_id, is_trending, stock)
VALUES (
    'f4444444-4444-4444-4444-444444444444',
    'Mini Blender Portable Rechargeable',
    'خلاط محمول صغير قابل للشحن',
    'Offre exclusive post-commande — profitez de ce mini blender rechargeable à prix réduit, réservée aux clients AtlasTrends.

Préparez vos smoothies, jus et boissons fraîches en quelques secondes où que vous soyez. Léger, rechargeable par USB et facile à transporter, ce mini blender est le compagnon idéal d''un mode de vie actif.

Points forts :
- Rechargeable par USB
- Lames en acier inoxydable
- Compact et facile à transporter
- Idéal pour smoothies, jus et milkshakes
- Nettoyage rapide et facile',
    'عرض حصري بعد الطلب — استفد من هذا الخلاط المحمول القابل للشحن بسعر مخفض، حصرياً لعملاء أطلس ترندز.

حضّر smoothies والعصائر والمشروبات المنعشة في ثوانٍ أينما كنت. خفيف، قابل للشحن عبر USB وسهل الحمل، هذا الخلاط المحمول رفيق مثالي لنمط حياة نشط.

النقاط الرئيسية :
- قابل للشحن عبر USB
- شفرات من الفولاذ المقاوم للصدأ
- مدمج وسهل النقل
- مثالي للـ smoothies والعصائر والميلك شيك
- تنظيف سريع وسهل',
    100.00,
    199.00,
    ARRAY['/products/mini-blender-offre.webp'],
    'mini-blender-offre',
    '9a9a923a-b213-43f2-8ade-7c52b82724d1',
    FALSE,
    25
) ON CONFLICT (id) DO UPDATE SET
    title_fr = EXCLUDED.title_fr,
    title_ar = EXCLUDED.title_ar,
    description_fr = EXCLUDED.description_fr,
    description_ar = EXCLUDED.description_ar,
    price = EXCLUDED.price,
    compare_at_price = EXCLUDED.compare_at_price,
    image_urls = EXCLUDED.image_urls,
    slug = EXCLUDED.slug,
    category_id = EXCLUDED.category_id,
    is_trending = EXCLUDED.is_trending,
    stock = EXCLUDED.stock;