'use client';

import React from 'react';

interface LpCtaButtonProps {
  className?: string;
  children: React.ReactNode;
}

export const LpCtaButton: React.FC<LpCtaButtonProps> = ({ className, children }) => {
  const scrollToOrder = () => {
    document.getElementById('lp-order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button type="button" onClick={scrollToOrder} className={className}>
      {children}
    </button>
  );
};