'use client';

import React from 'react';

interface LpStickyCtaProps {
  price: number;
}

export const LpStickyCta: React.FC<LpStickyCtaProps> = ({ price }) => {
  const scrollToOrder = () => {
    document.getElementById('lp-order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur supports-[padding-bottom:env(safe-area-inset-bottom)]:pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
        <div className="shrink-0 leading-tight">
          <span className="block text-base font-extrabold tabular-nums text-gray-900" dir="rtl">
            {price} <span className="text-sm">د.م</span>
          </span>
          <span className="block text-[11px] leading-tight text-gray-500">الدفع عند الاستلام</span>
        </div>
        <button
          type="button"
          onClick={scrollToOrder}
          className="flex-1 rounded-xl bg-blue-600 py-3.5 text-base font-extrabold text-white shadow-lg shadow-blue-600/25 enabled:hover:bg-blue-700"
        >
          اطلب دابا 👈
        </button>
      </div>
    </div>
  );
};