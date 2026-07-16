'use client';

import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

export const PremiumToast: React.FC<PremiumToastProps> = ({ message, visible, onDismiss }) => {
  useEffect(() => {
    if (!visible) return;

    const timer = window.setTimeout(onDismiss, 4200);
    return () => window.clearTimeout(timer);
  }, [visible, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed inset-x-0 bottom-6 z-50 flex justify-center px-5 pointer-events-none transition-all duration-500',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      <div className="pointer-events-auto flex items-center gap-3 border border-border bg-card/95 px-5 py-3.5 shadow-xl backdrop-blur-md max-w-md w-full sm:w-auto">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
          <Check className="h-4 w-4 text-foreground" strokeWidth={2} />
        </span>
        <p className="text-sm text-foreground text-start leading-snug">{message}</p>
      </div>
    </div>
  );
};
