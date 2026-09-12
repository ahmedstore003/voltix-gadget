'use client';

import React from 'react';
import { Truck, Banknote, Sparkles, ShieldCheck, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FEATURES = [
  { icon: Truck, labelKey: 'freeShippingLabel' as const, descKey: 'pdpFeatureShippingDesc' as const },
  { icon: Banknote, labelKey: 'secureCODLabel' as const, descKey: 'pdpFeatureCodDesc' as const },
  { icon: Sparkles, labelKey: 'premiumQualityLabel' as const, descKey: 'pdpFeatureQualityDesc' as const },
  { icon: ShieldCheck, labelKey: 'satisfactionLabel' as const, descKey: 'pdpFeatureSatisfactionDesc' as const },
];

interface Review {
  author: string;
  text: string;
}

const REVIEWS_BY_PRODUCT: Record<string, Review[]> = {
  'mini-lave-linge-portable': [
    {
      author: 'سارة – الدار البيضاء',
      text: 'صراحة زوينة بزاف، خديتها باش نغسل الملابس الداخلية والجوارب، كتسهل عليا الخدمة بزاف 👌',
    },
    {
      author: 'أمينة',
      text: 'عجبتني حيث صغيرة وما كتشدش البلاصة، كنستعملها للملابس ديال الدراري وكتخدمني مزيان.',
    },
  ],
  'lampe-nuit-lapins-tournants': [
    {
      author: 'مريم',
      text: 'زوين بزاف 😍 الضوء ديالو هادئ والأرانب كيدورو بطريقة كتريح، وليدي عجباتو بزاف وولات الغرفة ديالو كتجي زوينة فالليل 🌙❤️',
    },
    {
      author: 'نادية – الدار البيضاء',
      text: 'بصراحة جا أحسن مما كنت متوقعة 👌 الشكل ديالو كيوت بزاف والضو ماشي قوي، مناسب بزاف لغرفة الدراري. فرحانة بالشراء ديالي 🥰',
    },
  ],
};

interface ProductFeatureGridProps {
  productSlug?: string;
}

export const ProductFeatureGrid: React.FC<ProductFeatureGridProps> = ({ productSlug }) => {
  const { t } = useLanguage();

  const reviews = productSlug ? REVIEWS_BY_PRODUCT[productSlug] ?? [] : [];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {FEATURES.map(({ icon: Icon, labelKey, descKey }) => (
          <div
            key={labelKey}
            className="flex flex-col gap-2.5 voltix-surface p-4 text-start shadow-sm"
          >
            <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium text-foreground leading-snug">{t[labelKey]}</p>
              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">{t[descKey]}</p>
            </div>
          </div>
        ))}
      </div>

      {reviews.map((review, index) => (
        <div
          key={review.author}
          className={`${index === 0 ? 'mt-4' : 'mt-3'} voltix-surface p-4 shadow-sm text-start`}
        >
          <div className="flex items-center gap-1 text-amber-500">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
            ))}
          </div>
          <p className="mt-2 text-[13px] font-semibold text-foreground leading-snug">{review.author}</p>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed" dir="rtl">
            {review.text}
          </p>
        </div>
      ))}
    </>
  );
};