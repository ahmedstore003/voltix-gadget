import { Product } from '@/context/CartContext';

export interface Category {
  id: string;
  name_fr: string;
  name_ar: string;
  slug: string;
  created_at?: string;
}

export const LOCAL_CATEGORIES: Category[] = [
  {
    id: '9a9a923a-b213-43f2-8ade-7c52b82724d1',
    name_fr: 'Gadgets',
    name_ar: 'أجهزة ذكية',
    slug: 'gadgets',
  },
  {
    id: 'f3e020d6-6ca0-448c-b4b3-358f64876974',
    name_fr: 'Cosmétique',
    name_ar: 'مستحضرات تجميل',
    slug: 'cosmetique',
  },
  {
    id: '33c6f958-3d12-40f4-b258-450f38b1f8fd',
    name_fr: 'Trends',
    name_ar: 'صيحات الموضة',
    slug: 'trends',
  },
  {
    id: 'ce56d601-e170-4480-ae57-e46912727aab',
    name_fr: 'Cuisine',
    name_ar: 'مطبخ',
    slug: 'cuisine',
  },
];

export const LOCAL_PRODUCTS: Product[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    title_fr: 'Miroir mural design 90 × 40 cm',
    title_ar: 'مرآة حائط بتصميم عصري 90 × 40 سم',
    description_fr:
      "Apportez une touche d'élégance à votre intérieur avec ce miroir mural au design moderne. Sa grande surface offre une réflexion nette et lumineuse, idéale pour une chambre, une entrée, un salon ou un dressing.\n\nCe miroir au format généreux 90 × 40 cm agrandit visuellement l'espace et apporte une finition premium à votre décoration. Son cadre épuré s'intègre facilement dans les intérieurs contemporains, scandinaves ou minimalistes.\n\nPoints forts :\n- Design minimaliste et moderne\n- Grand format : 90 × 40 cm\n- Reflet clair et haute définition\n- Facile à installer au mur\n- Convient à tous les styles de décoration\n- Idéal chambre, entrée, salon ou dressing\n\nInstallation :\n- Se fixe facilement au mur avec des crochets ou vis (non inclus)\n- Peut être posé horizontalement ou verticalement selon votre espace\n\nEntretien :\n- Nettoyer avec un chiffon doux et sec\n- Éviter les produits abrasifs pour préserver la surface\n\nUn accessoire pratique qui transforme votre pièce tout en restant discret et élégant au quotidien.",
    description_ar:
      'أضف لمسة من الأناقة إلى ديكور منزلك مع هذه المرآة الحائطية بتصميم عصري. يوفر سطحها الكبير انعكاساً واضحاً ومشرقاً، مثالية لغرفة النوم أو المدخل أو الصالون أو غرفة الملابس.\n\nبمقاسها السخي 90 × 40 سم، توسّع هذه المرآة المساحة بصرياً وتضيف لمسة فاخرة لديكورك. إطارها البسيط يندمج بسهولة في الديكورات العصرية والبسيطة.\n\nالنقاط الرئيسية :\n- تصميم بسيط وعصري\n- مقاس كبير : 90 × 40 سم\n- انعكاس واضح وعالي الدقة\n- سهل التركيب على الحائط\n- يناسب جميع أنماط الديكور\n- مثالي للغرفة أو المدخل أو الصالون أو غرفة الملابس\n\nالتركيب :\n- يُثبّت بسهولة على الحائط بخطافات أو براغي (غير مرفقة)\n- يمكن تركيبه أفقياً أو عمودياً حسب مساحتك\n\nالعناية :\n- تنظيف بقطعة قماش ناعمة وجافة\n- تجنّب المواد الكاشطة للحفاظ على السطح\n\nإكسسوار عملي يحوّل غرفتك مع الحفاظ على أناقة بسيطة يومياً.',
    price: 200.0,
    image_urls: ['/products/miroir-mural-design.png'],
    slug: 'miroir-mural-design-90x40',
    category_id: '9a9a923a-b213-43f2-8ade-7c52b82724d1',
    is_trending: true,
    stock: 20,
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    title_fr: 'Lampe LED avec ventilateur multifonction',
    title_ar: 'مصباح LED مع مروحة متعددة الوظائف',
    description_fr:
      "Lampe LED avec ventilateur intégré, éclairage puissant, ventilation silencieuse et télécommande. Installation facile sur douille E27. Idéale pour toutes les pièces de la maison.\n\nProfitez d'un éclairage puissant et d'une ventilation agréable avec cette lampe LED équipée d'un ventilateur intégré. Facile à installer grâce à son culot standard, elle est idéale pour les chambres, salons, cuisines, bureaux ou ateliers. Contrôlez facilement la lumière et la vitesse du ventilateur grâce à la télécommande incluse.\n\nCaractéristiques :\n- Éclairage LED haute luminosité\n- Ventilateur silencieux à plusieurs vitesses\n- Télécommande incluse\n- Installation rapide sur une douille standard (E27)\n- Faible consommation d'énergie\n- Design moderne et compact\n- Idéale pour une utilisation toute l'année\n\nAvantages :\n- Deux fonctions en un seul appareil : lampe + ventilateur\n- Améliore le confort de la pièce\n- Économie d'énergie\n- Fonctionnement silencieux\n- Convient à la maison, au bureau ou aux commerces\n\nContenu du colis :\n- 1 Lampe LED avec ventilateur\n- 1 Adaptateur de douille (selon le modèle)\n- 1 Télécommande\n- 1 Manuel d'utilisation",
    description_ar:
      'مصباح LED مع مروحة مدمجة، إضاءة قوية، تهوية هادئة وريموت تحكم. تركيب سهل على مقبس E27. مثالي لجميع غرف المنزل.\n\nاستمتع بإضاءة قوية وتهوية مريحة مع هذا المصباح LED المزود بمروحة مدمجة. سهل التركيب بفضل مقبسه القياسي، مثالي للغرف والصالات والمطابخ والمكاتب أو الورش. تحكم بسهولة في الإضاءة وسرعة المروحة عبر ريموت التحكم المرفق.\n\nالمواصفات :\n- إضاءة LED عالية السطوع\n- مروحة هادئة بعدة سرعات\n- ريموت تحكم مرفق\n- تركيب سريع على مقبس E27\n- استهلاك منخفض للطاقة\n- تصميم عصري ومدمج\n- مثالي للاستخدام على مدار السنة\n\nالمزايا :\n- وظيفتان في جهاز واحد: مصباح + مروحة\n- يحسّن راحة الغرفة\n- توفير الطاقة\n- تشغيل هادئ\n- مناسب للمنزل والمكتب أو المحلات\n\nمحتويات العلبة :\n- 1 مصباح LED مع مروحة\n- 1 محول مقبس (حسب الموديل)\n- 1 ريموت تحكم\n- 1 دليل استخدام',
    price: 200.0,
    image_urls: ['/products/lampe-led-ventilateur-multifonction.png'],
    slug: 'lampe-led-ventilateur-multifonction',
    category_id: '9a9a923a-b213-43f2-8ade-7c52b82724d1',
    is_trending: false,
    stock: 25,
  },
  {
    id: 'f3333333-3333-3333-3333-333333333333',
    title_fr: 'Lampe LED avec ventilateur multifonction',
    title_ar: 'مصباح LED مع مروحة متعددة الوظائف',
    description_fr:
      "Offre exclusive post-commande — profitez de cette lampe LED avec ventilateur intégré à prix réduit, réservée aux clients Voltix.\n\nLampe LED avec ventilateur intégré, éclairage puissant, ventilation silencieuse et télécommande. Installation facile sur douille E27. Idéale pour toutes les pièces de la maison.\n\nProfitez d'un éclairage puissant et d'une ventilation agréable avec cette lampe LED équipée d'un ventilateur intégré. Facile à installer grâce à son culot standard, elle est idéale pour les chambres, salons, cuisines, bureaux ou ateliers. Contrôlez facilement la lumière et la vitesse du ventilateur grâce à la télécommande incluse.\n\nCaractéristiques :\n- Éclairage LED haute luminosité\n- Ventilateur silencieux à plusieurs vitesses\n- Télécommande incluse\n- Installation rapide sur une douille standard (E27)\n- Faible consommation d'énergie\n- Design moderne et compact\n- Idéale pour une utilisation toute l'année\n\nAvantages :\n- Deux fonctions en un seul appareil : lampe + ventilateur\n- Améliore le confort de la pièce\n- Économie d'énergie\n- Fonctionnement silencieux\n- Convient à la maison, au bureau ou aux commerces\n\nContenu du colis :\n- 1 Lampe LED avec ventilateur\n- 1 Adaptateur de douille (selon le modèle)\n- 1 Télécommande\n- 1 Manuel d'utilisation",
    description_ar:
      'عرض حصري بعد الطلب — استفد من هذا المصباح LED مع مروحة مدمجة بسعر مخفّض، حصرياً لعملاء فولتكس.\n\nمصباح LED مع مروحة مدمجة، إضاءة قوية، تهوية هادئة وريموت تحكم. تركيب سهل على مقبس E27. مثالي لجميع غرف المنزل.\n\nاستمتع بإضاءة قوية وتهوية مريحة مع هذا المصباح LED المزود بمروحة مدمجة. سهل التركيب بفضل مقبسه القياسي، مثالي للغرف والصالات والمطابخ والمكاتب أو الورش. تحكم بسهولة في الإضاءة وسرعة المروحة عبر ريموت التحكم المرفق.\n\nالمواصفات :\n- إضاءة LED عالية السطوع\n- مروحة هادئة بعدة سرعات\n- ريموت تحكم مرفق\n- تركيب سريع على مقبس E27\n- استهلاك منخفض للطاقة\n- تصميم عصري ومدمج\n- مثالي للاستخدام على مدار السنة\n\nالمزايا :\n- وظيفتان في جهاز واحد: مصباح + مروحة\n- يحسّن راحة الغرفة\n- توفير الطاقة\n- تشغيل هادئ\n- مناسب للمنزل والمكتب أو المحلات\n\nمحتويات العلبة :\n- 1 مصباح LED مع مروحة\n- 1 محول مقبس (حسب الموديل)\n- 1 ريموت تحكم\n- 1 دليل استخدام',
    price: 100.0,
    compare_at_price: 200.0,
    image_urls: ['/products/lampe-led-ventilateur-multifonction.png'],
    slug: 'lampe-led-ventilateur-offre',
    category_id: '9a9a923a-b213-43f2-8ade-7c52b82724d1',
    is_trending: false,
    stock: 25,
  },
  {
    id: 'c4444444-4444-4444-4444-444444444444',
    title_fr: 'Masseur de nuque et épaules chauffant',
    title_ar: 'مساج كهربائي للرقبة والكتفين مع تدفئة',
    description_fr:
      "Offrez-vous un moment de détente à domicile grâce à ce masseur ergonomique conçu pour soulager les tensions musculaires. Son système de massage profond et sa fonction chauffante procurent une sensation de relaxation immédiate.\n\nPoints forts :\n- Massage profond des cervicales et des épaules\n- Fonction chauffante apaisante\n- Intensité réglable\n- Utilisation simple à la maison, au bureau ou en voiture\n- Design ergonomique et confortable\n\nIdéal pour réduire le stress, détendre les muscles et améliorer votre bien-être au quotidien.",
    description_ar:
      'امنح نفسك لحظة استرخاء في المنزل مع هذا المساج المريح المصمم لتخفيف التوتر العضلي. يوفر نظام التدليك العميق ووظيفة التدفئة إحساساً فورياً بالراحة.\n\nالنقاط الرئيسية :\n- تدليك عميق للرقبة والكتفين\n- وظيفة تدفئة مهدئة\n- شدة قابلة للتعديل\n- استخدام سهل في المنزل أو المكتب أو السيارة\n- تصميم مريح وعملي\n\nمثالي للتقليل من التوتر، إرخاء العضلات وتحسين رفاهيتك اليومية.',
    price: 220.0,
    image_urls: ['/products/masseur-nuque-epaules-chauffant.png'],
    slug: 'masseur-nuque-epaules-chauffant',
    category_id: '9a9a923a-b213-43f2-8ade-7c52b82724d1',
    is_trending: false,
    stock: 20,
  },
  {
    id: 'd3333333-3333-3333-3333-333333333333',
    title_fr: 'Mini Blender Portable Rechargeable',
    title_ar: 'خلاط محمول صغير قابل للشحن',
    description_fr:
      "Préparez vos smoothies, jus et boissons fraîches en quelques secondes où que vous soyez. Léger, rechargeable par USB et facile à transporter, ce mini blender est le compagnon idéal d'un mode de vie actif.\n\nPoints forts :\n- Rechargeable par USB\n- Lames en acier inoxydable\n- Compact et facile à transporter\n- Idéal pour smoothies, jus et milkshakes\n- Nettoyage rapide et facile\n\nProfitez de boissons fraîches et vitaminées à tout moment de la journée.",
    description_ar:
      'حضّر smoothies والعصائر والمشروبات المنعشة في ثوانٍ أينما كنت. خفيف، قابل للشحن عبر USB وسهل الحمل، هذا الخلاط المحمول رفيق مثالي لنمط حياة نشط.\n\nالنقاط الرئيسية :\n- قابل للشحن عبر USB\n- شفرات من الفولاذ المقاوم للصدأ\n- مدمج وسهل النقل\n- مثالي للـ smoothies والعصائر والميلك شيك\n- تنظيف سريع وسهل\n\nاستمتع بمشروبات منعشة وغنية بالفيتامينات في أي وقت من اليوم.',
    price: 120.0,
    image_urls: ['/products/mini-blender-portable-rechargeable.png'],
    slug: 'mini-blender-portable-rechargeable',
    category_id: 'ce56d601-e170-4480-ae57-e46912727aab',
    is_trending: false,
    stock: 25,
  },
  {
    id: 'd4444444-4444-4444-4444-444444444444',
    title_fr: 'Distributeur mural multifonction pour cuisine',
    title_ar: 'موزع حائط متعدد الوظائف للمطبخ',
    description_fr:
      "Gardez votre cuisine parfaitement organisée grâce à ce distributeur mural multifonction. Il permet de ranger le film alimentaire, le papier aluminium, le papier cuisson et l'essuie-tout dans un seul support pratique et élégant.\n\nPoints forts :\n- Gain de place\n- Installation facile\n- Coupe nette du film alimentaire\n- Design moderne\n- Cuisine propre et organisée",
    description_ar:
      'حافظ على مطبخك منظماً بفضل هذا الموزع الحائطي متعدد الوظائف. يتيح تخزين لفاف التغليف، ورق الألومنيوم، ورق الخبز ومناديل المطبخ في حامل واحد عملي وأنيق.\n\nالنقاط الرئيسية :\n- توفير المساحة\n- تركيب سهل\n- قطع نظيف للفيلم الغذائي\n- تصميم عصري\n- مطبخ نظيف ومنظم',
    price: 220.0,
    image_urls: ['/products/distributeur-mural-cuisine-multifonction.png'],
    slug: 'distributeur-mural-cuisine-multifonction',
    category_id: 'ce56d601-e170-4480-ae57-e46912727aab',
    is_trending: false,
    stock: 20,
  },
  {
    id: 'd5555555-5555-5555-5555-555555555555',
    title_fr: 'Lunch Box Isotherme avec Sac de Transport',
    title_ar: 'علبة غداء معزولة مع حقيبة نقل',
    description_fr:
      "Emportez vos repas partout grâce à cette lunch box pratique accompagnée de son sac isotherme. Elle permet de conserver vos aliments plus longtemps à bonne température tout en offrant un transport facile et sécurisé.\n\nPoints forts :\n- Plusieurs compartiments\n- Sac isotherme inclus\n- Étanche et résistante\n- Réutilisable et écologique\n- Idéale pour le travail, l'école et les voyages",
    description_ar:
      'احمل وجباتك أينما ذهبت بفضل علبة الغداء العملية المرافقة لحقيبة معزولة. تحافظ على طعامك بدرجة حرارة مناسبة لفترة أطول مع نقل سهل وآمن.\n\nالنقاط الرئيسية :\n- عدة حجرات\n- حقيبة معزولة مرفقة\n- مقاومة للماء ومتينة\n- قابلة لإعادة الاستخدام وصديقة للبيئة\n- مثالية للعمل والمدرسة والسفر',
    price: 150.0,
    image_urls: ['/products/lunch-box-isotherme-sac-transport.png'],
    slug: 'lunch-box-isotherme-sac-transport',
    category_id: 'ce56d601-e170-4480-ae57-e46912727aab',
    is_trending: false,
    stock: 25,
  },
  {
    id: 'b1111111-1111-1111-1111-111111111111',
    title_fr: 'Coffret The Ritual of Ayurveda',
    title_ar: 'طقم The Ritual of Ayurveda',
    description_fr:
      "Le coffret Ritual of Ayurveda est bien plus qu'un simple ensemble de soins. Il repose sur les principes de l'Ayurveda, une tradition indienne qui favorise l'équilibre entre le corps et l'esprit. Combinant des ingrédients naturels et des senteurs envoûtantes, ce coffret offre une expérience de détente profonde.",
    description_ar:
      'طقم Ritual of Ayurveda هو أكثر بكثير من مجموعة عناية بسيطة. يستند إلى مبادئ Ayurveda، التقليد الهندي الذي يعزز التوازن بين الجسد والعقل. بمزيج من المكونات الطبيعية والعطور الساحرة، يوفر هذا الطقم تجربة استرخاء عميقة.',
    price: 499.0,
    compare_at_price: 899.0,
    image_urls: ['/products/glowskin-led-mask.png'],
    slug: 'glowskin-led-mask',
    category_id: 'f3e020d6-6ca0-448c-b4b3-358f64876974',
    is_trending: true,
    stock: 12,
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    title_fr: 'Coffret The Ritual of Sakura',
    title_ar: 'طقم The Ritual of Sakura',
    description_fr:
      "Le coffret Ritual of Sakura est bien plus qu'un simple ensemble de soins. Inspiré de la tradition japonaise des cerisiers en fleurs, il célèbre la beauté éphémère et le renouveau. Combinant des ingrédients délicats et des senteurs florales, ce coffret offre une expérience de sérénité et de fraîcheur.",
    description_ar:
      'طقم Ritual of Sakura هو أكثر بكثير من مجموعة عناية بسيطة. مستوحى من تقليد أزهار الكرز الياباني، يحتفي بالجمال العابر والتجدد. بمزيج من المكونات الرقيقة والعطور الزهرية، يوفر هذا الطقم تجربة من الهدوء والانتعاش.',
    price: 499.0,
    compare_at_price: 899.0,
    image_urls: ['/products/glowskin-serum.png'],
    slug: 'glowskin-serum',
    category_id: 'f3e020d6-6ca0-448c-b4b3-358f64876974',
    is_trending: false,
    stock: 25,
  },
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    title_fr: 'AeroFlex Anti-Gravity Backpack',
    title_ar: 'حقيبة الظهر أيروفليكس المضادة للجاذبية',
    description_fr:
      "Le premier sac à dos ergonomique doté d'un système de suspension pneumatique breveté qui réduit la charge ressentie de 50%. Idéal voyage et travail.",
    description_ar:
      'أول حقيبة ظهر مريحة تتميز بنظام تعليق هوائي حاصل على براءة اختراع يقلل الوزن المحسوس بنسبة 50%. مثالية للسفر والعمل.',
    price: 349.0,
    compare_at_price: 699.0,
    image_urls: ['backpack_main', 'backpack_features', 'backpack_model'],
    slug: 'aeroflex-backpack',
    category_id: '33c6f958-3d12-40f4-b258-450f38b1f8fd',
    is_trending: true,
    stock: 8,
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    title_fr: 'AeroFlex Travel Organizer',
    title_ar: 'منظم السفر أيروفليكس',
    description_fr:
      'Pochette premium imperméable avec compartiments intelligents pour organiser vos câbles, passeport, et chargeurs en déplacement.',
    description_ar:
      'حقيبة تنظيم السفر المقاومة للماء مع جيوب ذكية لتنظيم الكابلات، جواز السفر، والشواحن بسهولة أثناء تنقلك.',
    price: 99.0,
    compare_at_price: 199.0,
    image_urls: ['organizer_main', 'organizer_detailed'],
    slug: 'aeroflex-organizer',
    category_id: '33c6f958-3d12-40f4-b258-450f38b1f8fd',
    is_trending: false,
    stock: 40,
  },
  {
    id: 'd1111111-1111-1111-1111-111111111111',
    title_fr: 'ChefPress 5-in-1 Vegetable Chopper',
    title_ar: 'مفرمة الخضار شيف بريس 5 في 1',
    description_fr:
      'Gagnez un temps précieux en cuisine. Découpez, râpez, et émincez tous vos légumes en une seule pression avec des lames en acier inoxydable.',
    description_ar:
      'وفر وقتك الثمين في المطبخ. قطعي، ابشري، وافرمي جميع خضرواتك بضغطة واحدة وبفضل شفرات الفولاذ المقاوم للصدأ الحادة.',
    price: 249.0,
    compare_at_price: 499.0,
    image_urls: ['chopper_main', 'chopper_accessories', 'chopper_action'],
    slug: 'chefpress-chopper',
    category_id: 'ce56d601-e170-4480-ae57-e46912727aab',
    is_trending: true,
    stock: 20,
  },
  {
    id: 'd2222222-2222-2222-2222-222222222222',
    title_fr: 'ChefPress Stainless Steel Peeler',
    title_ar: 'مقشرة شيف بريس المصنوعة من الفولاذ',
    description_fr:
      'Éplucheur ergonomique ultra-tranchant. Convient à tous les fruits et légumes, y compris les peaux dures.',
    description_ar:
      'مقشرة مريحة وحادة للغاية مصنوعة من الفولاذ المقاوم للصدأ. مناسبة لجميع أنواع الفواكه والخضروات بسهولة تامة.',
    price: 59.0,
    compare_at_price: 119.0,
    image_urls: ['peeler_main', 'peeler_detailed'],
    slug: 'chefpress-peeler',
    category_id: 'ce56d601-e170-4480-ae57-e46912727aab',
    is_trending: false,
    stock: 50,
  },
];
