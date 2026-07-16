'use client';

import React from 'react';
import { Check } from 'lucide-react';

export const SuccessCheckmark: React.FC = () => {
  return (
    <div className="relative mx-auto mb-8 flex h-16 w-16 items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-border success-check-ring" />
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card success-check-pop">
        <Check className="h-5 w-5 text-foreground" strokeWidth={2} />
      </span>
    </div>
  );
};
