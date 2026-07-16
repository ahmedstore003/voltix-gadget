'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { clamp, getTouchDistance } from './utils';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_MS = 280;
const DOUBLE_TAP_SCALE = 2.5;

interface TouchZoomOptions {
  enabled: boolean;
  onDoubleTapReset?: () => void;
}

export function useTouchZoom({ enabled }: TouchZoomOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isGesturing, setIsGesturing] = useState(false);

  const scaleRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);
  const panStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const lastTap = useRef(0);

  const applyScale = useCallback((next: number) => {
    const clamped = clamp(next, MIN_SCALE, MAX_SCALE);
    scaleRef.current = clamped;
    setScale(clamped);
  }, []);

  const applyPan = useCallback((next: { x: number; y: number }) => {
    panRef.current = next;
    setPan(next);
  }, []);

  const reset = useCallback(() => {
    applyScale(1);
    applyPan({ x: 0, y: 0 });
    pinchStart.current = null;
    panStart.current = null;
    setIsGesturing(false);
  }, [applyPan, applyScale]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enabled) return;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        setIsGesturing(true);
        pinchStart.current = {
          distance: getTouchDistance(event.touches[0], event.touches[1]),
          scale: scaleRef.current,
        };
        panStart.current = null;
        return;
      }

      if (event.touches.length === 1 && scaleRef.current > 1) {
        setIsGesturing(true);
        panStart.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
          panX: panRef.current.x,
          panY: panRef.current.y,
        };
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2 && pinchStart.current) {
        event.preventDefault();
        const distance = getTouchDistance(event.touches[0], event.touches[1]);
        const ratio = distance / pinchStart.current.distance;
        applyScale(pinchStart.current.scale * ratio);
        return;
      }

      if (event.touches.length === 1 && panStart.current && scaleRef.current > 1) {
        event.preventDefault();
        const deltaX = event.touches[0].clientX - panStart.current.x;
        const deltaY = event.touches[0].clientY - panStart.current.y;
        applyPan({
          x: panStart.current.panX + deltaX,
          y: panStart.current.panY + deltaY,
        });
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length > 0) return;

      pinchStart.current = null;
      panStart.current = null;
      setIsGesturing(false);

      if (scaleRef.current <= 1.05) {
        reset();
        return;
      }

      if (event.changedTouches.length === 1) {
        const now = Date.now();
        if (now - lastTap.current < DOUBLE_TAP_MS) {
          if (scaleRef.current > 1) {
            reset();
          } else {
            applyScale(DOUBLE_TAP_SCALE);
          }
          lastTap.current = 0;
          return;
        }
        lastTap.current = now;
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [enabled, applyPan, applyScale, reset]);

  const zoomInCenter = useCallback(() => {
    applyScale(DOUBLE_TAP_SCALE);
  }, [applyScale]);

  return {
    containerRef,
    scale,
    pan,
    isGesturing,
    reset,
    zoomInCenter,
  };
}
