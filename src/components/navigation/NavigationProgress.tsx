'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export const NavigationProgress: React.FC = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPath = useRef(pathname);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const startProgress = useCallback(() => {
    clearTimers();
    setVisible(true);
    setProgress(12);
    timers.current.push(setTimeout(() => setProgress(55), 80));
    timers.current.push(setTimeout(() => setProgress(82), 220));
  }, [clearTimers]);

  const finishProgress = useCallback(() => {
    clearTimers();
    setProgress(100);
    timers.current.push(
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 280)
    );
  }, [clearTimers]);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      finishProgress();
      prevPath.current = pathname;
    }
  }, [pathname, finishProgress]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href]');
      if (!anchor || anchor.getAttribute('target') === '_blank') return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href === pathname) return;

      startProgress();
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      clearTimers();
    };
  }, [pathname, startProgress, clearTimers]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[2px] overflow-hidden"
      aria-hidden
    >
      <div
        className="h-full bg-foreground origin-left transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
