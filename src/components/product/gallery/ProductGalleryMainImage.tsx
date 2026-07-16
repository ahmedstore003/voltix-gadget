'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isRealImageUrl } from './utils';

const ZOOM_SCALE = 2;

interface ProductGalleryMainImageProps {
  currentUrl: string;
  activeIndex: number;
  title: string;
  label: string;
  slidesCount: number;
  dir: 'ltr' | 'rtl';
  enableHoverZoom: boolean;
  tapHint: string;
  onOpenLightbox: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ProductGalleryMainImage: React.FC<ProductGalleryMainImageProps> = ({
  currentUrl,
  activeIndex,
  title,
  label,
  slidesCount,
  dir,
  enableHoverZoom,
  tapHint,
  onOpenLightbox,
  onPrev,
  onNext,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const hasRealImage = isRealImageUrl(currentUrl);
  const canZoom = enableHoverZoom && hasRealImage;
  const canOpenLightbox = !enableHoverZoom && hasRealImage;

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!canZoom) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = clampPercent(((event.clientX - rect.left) / rect.width) * 100);
      const y = clampPercent(((event.clientY - rect.top) / rect.height) * 100);
      setOrigin({ x, y });
    },
    [canZoom]
  );

  const handleMouseEnter = () => {
    if (canZoom) setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setOrigin({ x: 50, y: 50 });
  };

  return (
    <div
      className={`group relative aspect-square voltix-image-frame voltix-surface shadow-sm ${
        canZoom ? 'cursor-zoom-in' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        key={activeIndex}
        className="absolute inset-0 gallery-image-enter"
        style={
          canZoom
            ? {
                transform: isZoomed ? `scale(${ZOOM_SCALE})` : 'scale(1)',
                transformOrigin: `${origin.x}% ${origin.y}%`,
                transition: isZoomed
                  ? 'transform 0.2s ease-out, transform-origin 0.08s linear'
                  : 'transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1), transform-origin 0.45s ease-out',
              }
            : undefined
        }
      >
        {hasRealImage ? (
          <>
            <span className="absolute inset-0 bg-muted" aria-hidden />
            <Image
              src={currentUrl}
              alt={title}
              fill
              className={`select-none pointer-events-none ${
                enableHoverZoom ? 'object-cover' : 'object-contain'
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={95}
              priority={activeIndex === 0}
              draggable={false}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground select-none px-6 text-center">
              {label}
            </span>
          </div>
        )}
      </div>

      {canOpenLightbox && (
        <button
          type="button"
          onClick={onOpenLightbox}
          className="absolute inset-0 z-[1] lg:hidden cursor-pointer touch-manipulation"
          aria-label={`View ${title}`}
        />
      )}

      {slidesCount > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute top-1/2 start-3 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center border border-border bg-card/90 text-foreground opacity-100 sm:opacity-0 backdrop-blur-sm transition-opacity duration-200 sm:group-hover:opacity-100 hover:bg-card shadow-sm"
          >
            {dir === 'rtl' ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute top-1/2 end-3 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center border border-border bg-card/90 text-foreground opacity-100 sm:opacity-0 backdrop-blur-sm transition-opacity duration-200 sm:group-hover:opacity-100 hover:bg-card shadow-sm"
          >
            {dir === 'rtl' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </>
      )}

      {canOpenLightbox && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-background/70 to-transparent p-4 lg:hidden">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground text-center">
            {tapHint}
          </p>
        </div>
      )}
    </div>
  );
};

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}
