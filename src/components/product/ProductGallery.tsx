'use client';

import React, { useCallback, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ProductGalleryMainImage } from './gallery/ProductGalleryMainImage';
import { ProductGalleryThumbnails } from './gallery/ProductGalleryThumbnails';
import { ProductGalleryLightbox } from './gallery/ProductGalleryLightbox';
import { useCanHoverZoom } from './gallery/useCanHoverZoom';

interface ProductGalleryProps {
  slug: string;
  imageUrls: string[];
  title: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ slug, imageUrls, title }) => {
  const { t } = useLanguage();
  const dir = t.dir;
  const canHoverZoom = useCanHoverZoom();

  const slides = imageUrls.length > 0 ? imageUrls : ['placeholder'];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const label = slug.replace(/-/g, ' ');

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const currentUrl = slides[activeIndex];

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-start gap-3 sm:gap-4">
        <div className="order-1 min-w-0 flex-1 lg:order-2">
          <ProductGalleryMainImage
            currentUrl={currentUrl}
            activeIndex={activeIndex}
            title={title}
            label={label}
            slidesCount={slides.length}
            dir={dir}
            enableHoverZoom={canHoverZoom}
            tapHint={t.galleryTapToExpand}
            onOpenLightbox={() => setLightboxOpen(true)}
            onPrev={goPrev}
            onNext={goNext}
          />
        </div>

        {slides.length > 1 && (
          <div className="order-2 lg:order-1">
            <ProductGalleryThumbnails
              slides={slides}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              label={label}
            />
          </div>
        )}
      </div>

      <ProductGalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        slides={slides}
        activeIndex={activeIndex}
        onIndexChange={setActiveIndex}
        title={title}
        label={label}
        dir={dir}
      />
    </>
  );
};
