'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { isRealImageUrl } from './utils';
import { useTouchZoom } from './useTouchZoom';

interface ProductGalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  slides: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  title: string;
  label: string;
  dir: 'ltr' | 'rtl';
}

const SUPPRESS_BACKDROP_MS = 500;

export const ProductGalleryLightbox: React.FC<ProductGalleryLightboxProps> = ({
  isOpen,
  onClose,
  slides,
  activeIndex,
  onIndexChange,
  title,
  label,
  dir,
}) => {
  const [mounted, setMounted] = useState(false);
  const suppressBackdropUntil = useRef(0);
  const { containerRef, scale, pan, isGesturing, reset, zoomInCenter } = useTouchZoom({
    enabled: isOpen,
  });

  const currentUrl = slides[activeIndex];
  const hasRealImage = isRealImageUrl(currentUrl);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    suppressBackdropUntil.current = Date.now() + SUPPRESS_BACKDROP_MS;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      reset();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onIndexChange((activeIndex - 1 + slides.length) % slides.length);
      if (event.key === 'ArrowRight') onIndexChange((activeIndex + 1) % slides.length);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, onIndexChange, activeIndex, slides.length, reset]);

  useEffect(() => {
    reset();
  }, [activeIndex, reset]);

  const handleBackdropClick = useCallback(() => {
    if (Date.now() < suppressBackdropUntil.current) return;
    if (scale > 1) {
      reset();
      return;
    }
    onClose();
  }, [onClose, reset, scale]);

  const handleImageDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (scale > 1) {
        reset();
      } else {
        zoomInCenter();
      }
    },
    [reset, scale, zoomInCenter]
  );

  if (!mounted || !isOpen) return null;

  const goPrev = () => onIndexChange((activeIndex - 1 + slides.length) % slides.length);
  const goNext = () => onIndexChange((activeIndex + 1) % slides.length);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-background/98 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="flex shrink-0 items-center justify-end p-4 sm:p-5">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 pb-8"
        onClick={handleBackdropClick}
      >
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute start-3 sm:start-6 z-20 flex h-10 w-10 items-center justify-center border border-border bg-card/90 text-foreground backdrop-blur-sm"
            >
              {dir === 'rtl' ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute end-3 sm:end-6 z-20 flex h-10 w-10 items-center justify-center border border-border bg-card/90 text-foreground backdrop-blur-sm"
            >
              {dir === 'rtl' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </>
        )}

        <div
          ref={containerRef}
          className="relative mx-auto h-[75dvh] w-[min(92vw,1400px)] touch-none select-none"
          style={{ touchAction: 'none' }}
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isGesturing ? 'none' : 'transform 0.22s ease-out',
            }}
            onDoubleClick={handleImageDoubleClick}
          >
            {hasRealImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentUrl}
                alt={title}
                className="max-h-[75dvh] max-w-[min(92vw,1400px)] w-auto h-auto object-contain select-none pointer-events-none"
                draggable={false}
              />
            ) : (
              <div className="flex min-h-[40dvh] min-w-[60vw] items-center justify-center border border-border bg-muted px-6">
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground text-center">
                  {label}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="flex shrink-0 justify-center gap-1.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to image ${index + 1}`}
              onClick={() => onIndexChange(index)}
              className={`h-1 rounded-full transition-all duration-200 ${
                index === activeIndex ? 'w-6 bg-foreground' : 'w-1.5 bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};
