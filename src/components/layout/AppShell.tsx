'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { StoreFooter } from '@/components/layout/StoreFooter';
import { NavigationProgress } from '@/components/navigation/NavigationProgress';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex-1 flex flex-col min-h-full">
      <NavigationProgress />
      <Header />
      {children}
      <StoreFooter />
    </div>
  );
};
