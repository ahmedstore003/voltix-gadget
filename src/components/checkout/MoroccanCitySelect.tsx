'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MOROCCAN_CITIES, getCityLabel } from '@/constants/cities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface MoroccanCitySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  onOpen?: () => void;
  hasError?: boolean;
  id?: string;
}

export const MoroccanCitySelect: React.FC<MoroccanCitySelectProps> = ({
  value,
  onValueChange,
  onOpen,
  hasError = false,
  id = 'customer-city',
}) => {
  const { t, language } = useLanguage();

  return (
    <Select
      value={value || undefined}
      onValueChange={onValueChange}
      onOpenChange={(open) => {
        if (open) onOpen?.();
      }}
    >
      <SelectTrigger
        id={id}
        aria-invalid={hasError}
        className={cn(hasError && 'border-red-500/80 focus:border-red-500/80')}
      >
        <SelectValue placeholder={t.selectCity} />
      </SelectTrigger>
      <SelectContent>
        {MOROCCAN_CITIES.map((city) => (
          <SelectItem key={city.fr} value={city.fr}>
            {getCityLabel(city, language)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
