export type Language = 'fr' | 'ar';

export interface TranslationDict {
  dir: 'ltr' | 'rtl';
  brandName: string;
  heroTagline: string;
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  viewProduct: string;
  buyNow: string;
  reviewsTitle: string;
  reviewsSub: string;
  featuresTitle: string;
  featuresSub: string;
  shippingBadge: string;
  checkoutTitle: string;
  checkoutSub: string;
  fullName: string;
  fullNamePlaceholder: string;
  phoneNumber: string;
  phoneNumberPlaceholder: string;
  city: string;
  selectCity: string;
  address: string;
  addressPlaceholder: string;
  quantityTitle: string;
  bundleStandardLabel: string;
  bundleStandardSub: string;
  bundleDuoLabel: string;
  bundleDuoRecommended: string;
  bundleDuoSub: string;
  bundleDuoQuantityHint: string;
  bundleTrioLabel: string;
  bundleTrioSub: string;
  bundleTrioBadge: string;
  bundleTrioQuantityHint: string;
  bundleSavingsBadge: string;
  orderNowBundle: string;
  qty1Option: string;
  qty2Option: string;
  qty1Sub: string;
  totalLabel: string;
  placeOrder: string;
  processing: string;
  codBadge: string;
  validationName: string;
  validationPhone: string;
  validationPhoneFormat: string;
  validationCity: string;
  validationAddress: string;
  upsellTitle: string;
  upsellSub: string;
  upsellProduct: string;
  upsellOffer: string;
  upsellDesc: string;
  upsellTimer: string;
  upsellAddBtn: string;
  upsellDeclineBtn: string;
  upsellSuccess: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  
  // General Store Expansion
  trendingTitle: string;
  trendingSub: string;
  categoriesTitle: string;
  categoriesSub: string;
  addToCart: string;
  addedToCart: string;
  cartTitle: string;
  cartEmpty: string;
  cartSubtotal: string;
  cartCheckout: string;
  continueShopping: string;
  descriptionTab: string;
  specsTab: string;
  buyNowPDP: string;
  readMore: string;
  readLess: string;
  backToStore: string;
  checkoutCartTitle: string;
  checkoutCartSub: string;
  orderSummaryTitle: string;
  checkoutFreeShippingBadge: string;
  freeShippingLabel: string;
  secureCODLabel: string;
  orderReferenceLabel: string;
  whatsAppConfirmationDesc: string;
  itemsLabel: string;
  itemLabel: string;
  homeBestsellersLabel: string;
  noProductsAvailable: string;
  footerCopyright: string;
  footerMadeIn: string;
  cartEmptyDesc: string;
  thankYouTitle: string;
  paymentMethodLabel: string;
  orderConfirmedTitle: string;
  newTotalLabel: string;
  continueBtn: string;
  secureInfoLabel: string;
  homeLabel: string;
  categoryNotFound: string;
  categoryNotFoundDesc: string;
  categoryEmptyDesc: string;
  categoryEmptyCta: string;
  sortByLabel: string;
  sortNewest: string;
  sortPriceLowHigh: string;
  sortPriceHighLow: string;
  productsCountLabel: string;
  productCountLabel: string;
  noCategoryProducts: string;
  productNotFound: string;
  productNotFoundDesc: string;
  pdpFeatureShippingDesc: string;
  pdpFeatureCodDesc: string;
  pdpFeatureQualityDesc: string;
  pdpFeatureSatisfactionDesc: string;
  galleryTapToExpand: string;
  pageNotFound: string;
  pageNotFoundDesc: string;
  limitedStock: string;
  premiumQualityLabel: string;
  satisfactionLabel: string;
  unitLabel: string;
  currencyMad: string;
  footerDelivery: string;
  footerContact: string;
  upsellAddFor: string;
  submitError: string;
  thankYouConfirmationMessage: string;
  upsellExclusiveTitle: string;
  upsellOneClickCta: string;
  orderUpdatedToast: string;
  orderInvoiceTitle: string;
  orderNotFound: string;
  orderNotFoundDesc: string;
  themeSwitchLight: string;
  themeSwitchDark: string;
}

export const translations: Record<Language, TranslationDict> = {
  fr: {
    dir: 'ltr',
    brandName: 'AtlasTrends',
    heroTagline: 'AtlasTrends | L\'Élite Technologique',
    heroTitle: 'L\'essentiel, sélectionné avec soin.',
    heroSub: 'Gadgets, cosmétique, cuisine et tendances. Qualité premium, paiement à la livraison.',
    heroCta: 'Explorer la collection',
    viewProduct: 'Voir le produit',
    buyNow: 'Commander',
    reviewsTitle: 'Ce que disent nos clients',
    reviewsSub: 'Plus de 5,000 Marocains font confiance à AtlasTrends pour optimiser leur quotidien.',
    featuresTitle: 'Révolutionnez votre quotidien',
    featuresSub: 'Conçue pour s\'intégrer parfaitement à votre vie active, avec des capteurs de qualité médicale.',
    shippingBadge: 'Livraison Gratuite Partout au Maroc & Paiement à la Livraison',
    checkoutTitle: 'Finaliser la commande',
    checkoutSub: 'Remplissez vos informations. Paiement en espèces à la livraison.',
    fullName: 'Nom Complet',
    fullNamePlaceholder: 'Ex: Mohamed El Alami',
    phoneNumber: 'Numéro de Téléphone',
    phoneNumberPlaceholder: 'Ex: 0612345678',
    city: 'Ville',
    selectCity: 'Sélectionnez votre ville',
    address: 'Adresse de Livraison',
    addressPlaceholder: 'Ex: N° 12, Rue des Fleurs, Quartier Gauthier',
    quantityTitle: 'Choisissez votre offre',
    bundleStandardLabel: 'Offre Standard',
    bundleStandardSub: '1× produit · {price} DH',
    bundleDuoLabel: 'Offre Duo',
    bundleDuoRecommended: 'Recommandée',
    bundleDuoSub: '2× produit · −{percent} % sur le 2e',
    bundleDuoQuantityHint: 'Pack de {qty} unités sélectionné',
    bundleTrioLabel: 'Offre Trio',
    bundleTrioSub: '3× produit · 2e −{duoPercent} %, 3e −{trioPercent} %',
    bundleTrioBadge: 'Max économies',
    bundleTrioQuantityHint: 'Pack Trio · {qty} unités',
    bundleSavingsBadge: 'Vous économisez {amount} DH',
    orderNowBundle: 'Commander maintenant',
    qty1Option: '1 produit',
    qty2Option: 'Offre Duo — 2 produits',
    qty1Sub: '{price} DH — Livraison incluse',
    totalLabel: 'Total à payer :',
    placeOrder: 'Confirmer ma Commande',
    processing: 'Traitement en cours...',
    codBadge: 'Paiement en espèces à la livraison (COD)',
    validationName: 'Le nom complet est requis.',
    validationPhone: 'Le numéro de téléphone est requis.',
    validationPhoneFormat: 'Format invalide. Le numéro doit comporter 10 chiffres et commencer par 06, 07 ou 05.',
    validationCity: 'Veuillez sélectionner votre ville.',
    validationAddress: 'L\'adresse de livraison complète est requise.',
    upsellTitle: 'Complétez votre commande',
    upsellSub: 'Ne manquez pas cette opportunité unique !',
    upsellProduct: 'AtlasTrends Charging Dock Pro',
    upsellOffer: 'Ajouter à ma commande pour seulement 149 MAD ! (Au lieu de 299 MAD)',
    upsellDesc: 'Ne manquez jamais d\'énergie. Ce dock magnétique premium en aluminium charge votre produit en seulement 30 minutes. Offre valable uniquement sur cette page.',
    upsellTimer: 'Cette offre expire dans :',
    upsellAddBtn: 'Oui, ajouter à ma commande (-50%)',
    upsellDeclineBtn: 'Non merci, finaliser ma commande simple',
    upsellSuccess: 'Votre commande a été mise à jour avec succès !',
    feature1Title: 'Titane de Grade 5',
    feature1Desc: 'Aussi résistant que l\'acier, mais deux fois plus léger. Conçue pour résister aux épreuves du temps.',
    feature2Title: 'Suivi de Santé 24/7',
    feature2Desc: 'Capteurs de fréquence cardiaque, d\'oxygène sanguin et de température corporelle de niveau médical.',
    feature3Title: 'Analyse du Sommeil',
    feature3Desc: 'Comprenez vos cycles de sommeil profond, léger et REM pour vous réveiller pleinement ressourcé.',
    feature4Title: 'Autonomie de 7 Jours',
    feature4Desc: 'Une batterie ultra-dense qui dure une semaine complète avec une seule charge rapide de 45 minutes.',
    
    // General Store Expansion
    trendingTitle: 'Tous nos produits',
    trendingSub: 'L\'intégralité du catalogue AtlasTrends, livraison COD partout au Maroc.',
    categoriesTitle: 'Catégories',
    categoriesSub: '',
    addToCart: 'Ajouter au Panier',
    addedToCart: 'Ajouté !',
    cartTitle: 'Mon Panier',
    cartEmpty: 'Votre panier est vide.',
    cartSubtotal: 'Sous-total',
    cartCheckout: 'Procéder au Paiement',
    continueShopping: 'Continuer mes achats',
    descriptionTab: 'Description',
    specsTab: 'Fiche Technique',
    buyNowPDP: 'Acheter Maintenant',
    readMore: 'Voir plus',
    readLess: 'Voir moins',
    backToStore: 'Retourner à la boutique',
    checkoutCartTitle: 'Finalisez votre commande COD',
    checkoutCartSub: 'Payez en espèces lors de la livraison à votre domicile partout au Maroc !',
    orderSummaryTitle: 'Récapitulatif de la commande',
    checkoutFreeShippingBadge: 'Livraison Gratuite',
    freeShippingLabel: 'Livraison Gratuite',
    secureCODLabel: 'Paiement Sécurisé à la Livraison',
    orderReferenceLabel: 'Référence :',
    whatsAppConfirmationDesc: 'Un agent AtlasTrends va vous contacter par téléphone ou WhatsApp dans les 2 heures pour confirmer votre taille et votre adresse de livraison.',
    itemsLabel: 'articles',
    itemLabel: 'article',
    homeBestsellersLabel: 'Catalogue',
    noProductsAvailable: 'Aucun produit disponible pour le moment.',
    footerCopyright: '© 2026 AtlasTrends General Store. Tous droits réservés.',
    footerMadeIn: 'Maroc',
    footerDelivery: 'Livraison nationale · Paiement à la livraison',
    footerContact: 'Service client 7j/7',
    limitedStock: 'Stock limité',
    premiumQualityLabel: 'Qualité premium',
    satisfactionLabel: 'Satisfaction garantie',
    unitLabel: 'unité',
    currencyMad: 'DH',
    upsellAddFor: 'Ajouter pour',
    submitError: 'Une erreur s\'est produite. Veuillez réessayer.',
    thankYouConfirmationMessage:
      'Commande confirmée ! Notre équipe vous appellera sous 24 heures pour confirmer vos informations de livraison avant l\'expédition.',
    upsellExclusiveTitle: 'Offre exclusive réservée à votre commande',
    upsellOneClickCta: 'Ajouter à ma commande en 1 clic',
    orderUpdatedToast: 'Commande mise à jour avec succès !',
    orderInvoiceTitle: 'Récapitulatif',
    orderNotFound: 'Commande introuvable',
    orderNotFoundDesc: 'Cette commande est introuvable ou le lien a expiré.',
    themeSwitchLight: 'Activer le mode clair',
    themeSwitchDark: 'Activer le mode sombre',
    cartEmptyDesc: 'Explorez notre catalogue et ajoutez des articles de qualité à votre panier.',
    thankYouTitle: 'Merci pour votre confiance !',
    paymentMethodLabel: 'Mode de paiement :',
    orderConfirmedTitle: 'Commande Confirmée !',
    newTotalLabel: 'Nouveau total :',
    continueBtn: 'Continuer',
    secureInfoLabel: 'Vos informations sont 100% sécurisées.',
    homeLabel: 'Accueil',
    categoryNotFound: 'Catégorie non trouvée',
    categoryNotFoundDesc: 'Cette catégorie n\'existe pas ou a été déplacée.',
    categoryEmptyDesc: 'Revenez bientôt — de nouvelles pièces premium arrivent régulièrement.',
    categoryEmptyCta: 'Explorer la boutique',
    sortByLabel: 'Trier par',
    sortNewest: 'Nouveautés',
    sortPriceLowHigh: 'Prix croissant',
    sortPriceHighLow: 'Prix décroissant',
    productsCountLabel: 'produits',
    productCountLabel: 'produit',
    noCategoryProducts: 'Aucun produit disponible dans cette catégorie pour le moment.',
    productNotFound: 'Produit non trouvé',
    productNotFoundDesc: 'Ce produit n\'existe plus ou l\'adresse est incorrecte. Retournez à la boutique pour découvrir notre sélection.',
    pdpFeatureShippingDesc: 'Partout au Maroc',
    pdpFeatureCodDesc: 'Payez à la réception',
    pdpFeatureQualityDesc: 'Sélection premium',
    pdpFeatureSatisfactionDesc: 'Service client dédié',
    galleryTapToExpand: 'Appuyez pour agrandir',
    pageNotFound: 'Page introuvable',
    pageNotFoundDesc: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
  },
  ar: {
    dir: 'rtl',
    brandName: 'أتلاس تريندز',
    heroTagline: 'أتلاس تريندز | نخبة التكنولوجيا',
    heroTitle: 'الأساسيات، مختارة بعناية.',
    heroSub: 'أجهزة، مستحضرات تجميل، مطبخ وصيحات. جودة ممتازة، الدفع عند الاستلام.',
    heroCta: 'استكشف المجموعة',
    viewProduct: 'عرض المنتج',
    buyNow: 'اطلب الآن',
    reviewsTitle: 'آراء عملائنا',
    reviewsSub: 'أكثر من 5,000 مغربي يثقون في أتلاس تريندز لتحسين حياتهم اليومية.',
    featuresTitle: 'أحدث ثورة في حياتك اليومية',
    featuresSub: 'مصممة لتندمج تمامًا مع أسلوب حياتك النشط، مع مستشعرات طبية دقيقة.',
    shippingBadge: 'توصيل مجاني لجميع المدن المغربية والدفع عند الاستلام',
    checkoutTitle: 'إتمام الطلب',
    checkoutSub: 'أدخل معلوماتك. الدفع نقداً عند الاستلام.',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'مثال: محمد العلمي',
    phoneNumber: 'رقم الهاتف',
    phoneNumberPlaceholder: 'مثال: 0612345678',
    city: 'المدينة',
    selectCity: 'اختر مدينتك',
    address: 'عنوان التوصيل',
    addressPlaceholder: 'مثال: رقم 12، شارع الزهور، حي جيلييز',
    quantityTitle: 'اختر عرضك',
    bundleStandardLabel: 'العرض القياسي',
    bundleStandardSub: '1× منتج · {price} درهم',
    bundleDuoLabel: 'عرض Duo',
    bundleDuoRecommended: 'موصى به',
    bundleDuoSub: '2× منتج · −{percent} % على الثاني',
    bundleDuoQuantityHint: 'باقة من {qty} وحدات',
    bundleTrioLabel: 'عرض Trio',
    bundleTrioSub: '3× منتج · الثاني −{duoPercent} %، الثالث −{trioPercent} %',
    bundleTrioBadge: 'أقصى توفير',
    bundleTrioQuantityHint: 'باقة Trio · {qty} وحدات',
    bundleSavingsBadge: 'وفّرت {amount} درهم',
    orderNowBundle: 'اطلب الآن',
    qty1Option: 'منتج واحد',
    qty2Option: 'عرض Duo — منتجان',
    qty1Sub: '{price} درهم — توصيل مجاني',
    totalLabel: 'المجموع الكلي :',
    placeOrder: 'تأكيد الطلب الآن',
    processing: 'جاري إرسال الطلب...',
    codBadge: 'الدفع نقداً عند الاستلام',
    validationName: 'الاسم الكامل مطلوب.',
    validationPhone: 'رقم الهاتف مطلوب.',
    validationPhoneFormat: 'صيغة رقم الهاتف غير صحيحة. يجب أن يتكون من 10 أرقام ويبدأ بـ 06 أو 07 أو 05.',
    validationCity: 'الرجاء اختيار مدينتك.',
    validationAddress: 'العنوان الكامل مطلوب لتوصيل الطلب.',
    upsellTitle: 'أكمل طلبك',
    upsellSub: 'لا تفوت هذه الفرصة الفريدة والمحدودة!',
    upsellProduct: 'قاعدة الشحن أتلاس تريندز برو',
    upsellOffer: 'أضف قاعدة الشحن السريع بـ 149 درهم فقط! (بدل 299 درهم)',
    upsellDesc: 'لا تدع منتجك ينفد من الطاقة. قاعدة الشحن المغناطيسية الممتازة تشحن جهازك في 30 دقيقة فقط. هذا العرض متوفر فقط في هذه الصفحة الآن.',
    upsellTimer: 'ينتهي هذا العرض الحصري خلال:',
    upsellAddBtn: 'نعم، أضف هذا العرض لطلبي بخصم 50%',
    upsellDeclineBtn: 'لا شكراً، أريد طلبي الأصلي فقط وبدون إضافات',
    upsellSuccess: 'تم تحديث طلبك بنجاح وإضافة العرض الحصري!',
    feature1Title: 'تيتانيوم من الدرجة 5',
    feature1Desc: 'قوي كالفولاذ وخفيف كالريشة. مصمم ليتحمل أصعب الظروف اليومية ويبقى لامعاً.',
    feature2Title: 'مراقبة صحية 24/7',
    feature2Desc: 'قياس نبضات القلب، نسبة الأكسجين في الدم، ودرجة حرارة الجسم بمستشعرات طبية دقيقة.',
    feature3Title: 'تحليل جودة النوم',
    feature3Desc: 'افهم مراحل نومك العميق والخفيف لتستيقظ بكامل نشاطك وحيويتك كل صباح.',
    feature4Title: 'بطارية تدom 7 أيام',
    feature4Desc: 'بطارية عالية الكثافة تدوم أسبوعاً كاملاً بشحنة واحدة سريعة لا تتعدى 45 دقيقة.',
    
    // General Store Expansion
    trendingTitle: 'جميع منتجاتنا',
    trendingSub: 'اكتشف جميع منتجات AtlasTrends مع الدفع عند الاستلام في جميع أنحاء المغرب.',
    categoriesTitle: 'الفئات',
    categoriesSub: '',
    addToCart: 'أضف إلى السلة',
    addedToCart: 'تمت الإضافة !',
    cartTitle: 'سلتي',
    cartEmpty: 'سلتك فارغة حالياً.',
    cartSubtotal: 'المجموع الفرعي',
    cartCheckout: 'الانتقال إلى الدفع',
    continueShopping: 'الاستمرار في التسوق',
    descriptionTab: 'الوصف',
    specsTab: 'المواصفات التقنية',
    buyNowPDP: 'اشتري الآن',
    readMore: 'عرض المزيد',
    readLess: 'عرض أقل',
    backToStore: 'العودة إلى المتجر',
    checkoutCartTitle: 'أكمل طلب الدفع عند الاستلام',
    checkoutCartSub: 'ادفع نقداً عند توصيل طلبك إلى باب منزلك في أي مكان في المغرب !',
    orderSummaryTitle: 'ملخص الطلبية',
    checkoutFreeShippingBadge: 'شحن مجاني',
    freeShippingLabel: 'توصيل مجاني',
    secureCODLabel: 'الدفع عند الاستلام آمن وموثوق',
    orderReferenceLabel: 'المرجع :',
    whatsAppConfirmationDesc: 'سيتصل بك أحد وكلائنا هاتفياً أو عبر الواتساب خلال ساعتين لتأكيد المقاسات وتأكيد عنوان التوصيل.',
    itemsLabel: 'منتجات',
    itemLabel: 'منتج',
    homeBestsellersLabel: 'المتجر',
    noProductsAvailable: 'لا توجد منتجات متاحة حالياً.',
    footerCopyright: '© 2026 أتلاس تريندز. جميع الحقوق محفوظة.',
    footerMadeIn: 'المغرب',
    footerDelivery: 'توصيل وطني · الدفع عند الاستلام',
    footerContact: 'خدمة العملاء طوال الأسبوع',
    limitedStock: 'كمية محدودة',
    premiumQualityLabel: 'جودة ممتازة',
    satisfactionLabel: 'ضمان الرضا',
    unitLabel: 'وحدة',
    currencyMad: 'درهم',
    upsellAddFor: 'أضف مقابل',
    submitError: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    thankYouConfirmationMessage:
      'تم تأكيد طلبك! سيتصل بك أحد عملائنا خلال 24 ساعة لتأكيد عنوان الشحن قبل الإرسال.',
    upsellExclusiveTitle: 'عرض حصري وخاص بطلبك',
    upsellOneClickCta: 'أضف إلى طلبي بضغطة واحدة',
    orderUpdatedToast: 'تم تحديث طلبك بنجاح!',
    orderInvoiceTitle: 'ملخص الطلب',
    orderNotFound: 'الطلب غير موجود',
    orderNotFoundDesc: 'تعذر العثور على هذا الطلب أو انتهت صلاحية الرابط.',
    themeSwitchLight: 'تفعيل الوضع الفاتح',
    themeSwitchDark: 'تفعيل الوضع الداكن',
    cartEmptyDesc: 'استكشف متجرنا وأضف منتجات ممتازة إلى سلتك.',
    thankYouTitle: 'شكراً لثقتكم بنا !',
    paymentMethodLabel: 'طريقة الدفع :',
    orderConfirmedTitle: 'تم تأكيد طلبك بنجاح!',
    newTotalLabel: 'المجموع الجديد :',
    continueBtn: 'متابعة',
    secureInfoLabel: 'معلوماتك آمنة ومحمية بنسبة 100%.',
    homeLabel: 'الرئيسية',
    categoryNotFound: 'الفئة غير موجودة',
    categoryNotFoundDesc: 'هذه الفئة غير موجودة أو تم نقلها.',
    categoryEmptyDesc: 'عد قريباً — نضيف منتجات مميزة باستمرار.',
    categoryEmptyCta: 'استكشف المتجر',
    sortByLabel: 'ترتيب حسب',
    sortNewest: 'الأحدث',
    sortPriceLowHigh: 'السعر: من الأقل إلى الأعلى',
    sortPriceHighLow: 'السعر: من الأعلى إلى الأقل',
    productsCountLabel: 'منتجات',
    productCountLabel: 'منتج',
    noCategoryProducts: 'لا توجد منتجات في هذه الفئة حالياً.',
    productNotFound: 'المنتج غير موجود',
    productNotFoundDesc: 'هذا المنتج غير متوفر أو الرابط غير صحيح. عد إلى المتجر لاكتشاف مجموعتنا.',
    pdpFeatureShippingDesc: 'في جميع أنحاء المغرب',
    pdpFeatureCodDesc: 'ادفع عند الاستلام',
    pdpFeatureQualityDesc: 'منتجات مختارة بعناية',
    pdpFeatureSatisfactionDesc: 'خدمة عملاء مخصصة',
    galleryTapToExpand: 'اضغط للتكبير',
    pageNotFound: 'الصفحة غير موجودة',
    pageNotFoundDesc: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
  },
};
