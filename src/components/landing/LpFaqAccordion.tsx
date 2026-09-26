'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'واش السمطة كتطيح على قراري مقاسي؟',
    a: 'لا، القماش المطاط كيتكيف على محيط وسطك. تناسب عادة من مقاس 30 حتى 42 — وحدة كافي.',
  },
  {
    q: 'شحال ياخد التوصيل للدار البيضاء؟',
    a: 'عادة خلال 24–48 ساعة من تأكيد الطلب. كيتصلو بيك باش يثبتو العنوان قبل الإرسال.',
  },
];

export const LpFaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-8 max-w-2xl space-y-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
            >
              <span className="text-[15px] font-bold text-gray-900">{item.q}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-blue-600 transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
                strokeWidth={2.5}
              />
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};