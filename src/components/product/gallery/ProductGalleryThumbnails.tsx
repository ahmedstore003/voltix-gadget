'use client';

import React from 'react';
import Image from 'next/image';
import { isRealImageUrl } from './utils';

interface ProductGalleryThumbnailsProps {
  slides: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  label: string;
}

export const ProductGalleryThumbnails: React.FC<ProductGalleryThumbnailsProps> = ({
  slides,
  activeIndex,
  onSelect,
  label,
}) => {
  if (slides.length <= 1) return null;

  return (
    <div
      className="flex gap-2 overflow-x-auto hide-scrollbar pb-0.5 lg:flex-col lg:overflow-visible lg:pb-0 lg:w-[72px] lg:shrink-0"
      role="tablist"
      aria-label="Product images"
    >
      {slides.map((url, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={`${url}-${index}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Image ${index + 1}`}
            onClick={() => onSelect(index)}
            className={`relative aspect-square h-16 w-16 lg:h-[72px] lg:w-[72px] shrink-0 overflow-hidden voltix-image-frame bg-muted transition-transform duration-300 ease-out transform-gpu ${
              isActive
                ? 'ring-1 ring-foreground/20 shadow-sm scale-[1.02]'
                : 'opacity-75 hover:opacity-100 hover:scale-[1.02]'
            }`}
          >
            {isRealImageUrl(url) ? (
              <Image src={url} alt="" fill className="object-cover" sizes="72px" draggable={false} />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-muted text-[9px] uppercase tracking-wide text-muted-foreground">
                {label.slice(0, 3) || index + 1}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
