import React, { useRef, useEffect, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import styles from './Minimap.module.css';

interface MinimapProps {
  contentRef: React.RefObject<HTMLElement>;
  viewportRef?: React.RefObject<HTMLElement>;
  width?: number;
  height?: number;
  className?: string;
}

declare global {
  interface Window {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  }
}

const Minimap: React.FC<MinimapProps> = ({
  contentRef,
  viewportRef,
  width = 200,
  height = 400,
  className = ''
}) => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Guards for capture
  const capturingRef = useRef(false);
  const lastCaptureAtRef = useRef(0);
  const lastDataUrlRef = useRef<string>('');

  const idle = (cb: () => void, timeout = 1500) => {
    if (typeof window.requestIdleCallback === 'function') {
      return window.requestIdleCallback(cb, { timeout });
    }
    return window.setTimeout(cb, timeout);
  };

  const captureThumbnail = useCallback(async () => {
    const targetElement = document.documentElement;
    const minimapElement = minimapRef.current;
    if (!minimapElement || capturingRef.current) return;

    // throttle captures
    const now = Date.now();
    const MIN_INTERVAL = 2500; // реже снимаем, чем раньше
    if (now - lastCaptureAtRef.current < MIN_INTERVAL) return;

    capturingRef.current = true;
    lastCaptureAtRef.current = now;

    const prevOpacity = minimapElement.style.opacity;
    minimapElement.style.opacity = '0.5';

    try {
      const dataUrl = await toPng(targetElement, {
        width: targetElement.scrollWidth || targetElement.offsetWidth,
        height: targetElement.scrollHeight,
        skipFonts: true,
        pixelRatio: 0.4,           // ещё чуть ниже ради скорости
        cacheBust: true,
        backgroundColor: 'transparent',
      });
      if (dataUrl && dataUrl !== lastDataUrlRef.current) {
        lastDataUrlRef.current = dataUrl;
        setThumbnail(dataUrl);
      }
    } catch (e) {
      // тихо игнорим — оставляем старый thumbnail
      // console.warn('Minimap capture failed', e);
    } finally {
      minimapElement.style.opacity = prevOpacity;
      capturingRef.current = false;
    }
  }, []);

  // content changes -> recapture (idle)
  useEffect(() => {
    if (!contentRef.current) return;

    const ro = new ResizeObserver(() => {
      idle(() => captureThumbnail(), 1200);
    });
    ro.observe(contentRef.current);

    const mo = new MutationObserver(() => {
      idle(() => captureThumbnail(), 1200);
    });
    mo.observe(contentRef.current, { childList: true, subtree: true, attributes: true, characterData: true });

    // initial
    idle(() => captureThumbnail(), 300);

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [contentRef, captureThumbnail]);

  // indicator update — fast, every scroll
  const updateScrollPosition = useCallback(() => {
    if (!minimapRef.current) return;

    const doc = document.documentElement;
    const scrollTop = Math.max(0, window.scrollY || doc.scrollTop || 0);
    const scrollHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;

    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    let ratio = scrollTop / maxScroll;
    if (!Number.isFinite(ratio)) ratio = 0;
    ratio = Math.min(Math.max(ratio, 0), 1);

    const indicator = minimapRef.current.querySelector(`.${styles['minimap-indicator']}`) as HTMLElement | null;
    if (indicator) {
      const indicatorHeightValue = Math.min(100, Math.max(0, (viewportHeight / scrollHeight) * 100));
      const maxPosition = Math.max(0, 100 - indicatorHeightValue);
      const position = Math.min(maxPosition, Math.max(0, ratio * maxPosition));

      indicator.style.setProperty('--indicator-top', `${position}%`);
      indicator.style.setProperty('--indicator-height', `${indicatorHeightValue}%`);
    }

    setScrollPosition(Math.round(ratio * 100));
  }, [viewportRef]);

  // scroll/resize listeners with debounce recapture
  useEffect(() => {
    let debounceId: number | null = null;

    const onScroll = () => {
      updateScrollPosition();
      // во время drag не снимаем превью
      if (isDragging) return;

      if (debounceId) cancelAnimationFrame(debounceId);
      debounceId = requestAnimationFrame(() => {
        idle(() => captureThumbnail(), 1200);
      });
    };

    const onResize = () => {
      updateScrollPosition();
      idle(() => captureThumbnail(), 1200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // initial
    updateScrollPosition();

    return () => {
      if (debounceId) cancelAnimationFrame(debounceId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateScrollPosition, captureThumbnail, isDragging]);

  // click/drag to scroll
  const handleMinimapInteraction = useCallback((e: React.MouseEvent) => {
    if (!minimapRef.current) return;
    const rect = minimapRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const h = rect.height;

    const edge = Math.max(8, h * 0.1); // 10% или 8px минимум
    let ratio: number;

    if (y < edge) ratio = 0;
    else if (y > h - edge) ratio = 1;
    else ratio = (y - edge) / (h - edge * 2);

    ratio = Math.min(Math.max(ratio, 0), 1);

    const doc = document.documentElement;
    const scrollHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    const newScrollTop = Math.round(ratio * maxScroll);

    window.scrollTo({ top: newScrollTop, behavior: 'smooth' });
  }, [viewportRef]);

  return (
    <div
      ref={minimapRef}
      className={`${styles['minimap-container']} ${className}`}
      style={
        {
          '--minimap-thumbnail-bg': thumbnail ? `url(${thumbnail})` : 'none',
        } as React.CSSProperties
      }
      role="region"
      aria-label="Page navigation"
    >
      <div className={styles['minimap-thumbnail']}>
        <div
          className={styles['minimap-interaction-layer']}
          onClick={handleMinimapInteraction}
          onMouseDown={(e) => { setIsDragging(true); handleMinimapInteraction(e); }}
          onMouseMove={(e) => { if (isDragging) handleMinimapInteraction(e); }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(scrollPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`Scrolled to ${Math.round(scrollPosition)}% of the page`}
          aria-orientation="vertical"
          aria-label="Document scroll position"
        />
        <div className={styles['minimap-indicator']} aria-hidden="true" />
      </div>
    </div>
  );
};

export default Minimap;
