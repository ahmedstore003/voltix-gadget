'use client';

import React from 'react';
import { Truck, Banknote, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FEATURES = [
  { icon: Truck, labelKey: 'freeShippingLabel' as const, descKey: 'pdpFeatureShippingDesc' as const },
  { icon: Banknote, labelKey: 'secureCODLabel' as const, descKey: 'pdpFeatureCodDesc' as const },
  { icon: Sparkles, labelKey: 'premiumQualityLabel' as const, descKey: 'pdpFeatureQualityDesc' as const },
  { icon: ShieldCheck, labelKey: 'satisfactionLabel' as const, descKey: 'pdpFeatureSatisfactionDesc' as const },
];

export const ProductFeatureGrid: React.FC = () => {
  const { t } = useLanguage();

  return (
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
  );
};
