'use client';

import { useEffect, useState } from 'react';

/** Desktop mouse/trackpad hover zoom only — never on phone/tablet portrait. */
export function useCanHoverZoom(): boolean {
  const [canHoverZoom, setCanHoverZoom] = useState(false);

  useEffect(() => {
    const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    const desktopMedia = window.matchMedia('(min-width: 1024px)');

    const update = () => setCanHoverZoom(hoverMedia.matches && desktopMedia.matches);
    update();

    hoverMedia.addEventListener('change', update);
    desktopMedia.addEventListener('change', update);
    return () => {
      hoverMedia.removeEventListener('change', update);
      desktopMedia.removeEventListener('change', update);
    };
  }, []);

  return canHoverZoom;
}
