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

  // Performance optimization refs
  const lastCaptureAtRef = useRef(0);
  const lastDataUrlRef = useRef('');
  const rafId = useRef<number>();

  const idle = (cb: () => void, timeout = 1500) => {
    if (typeof window.requestIdleCallback === 'function') {
      return window.requestIdleCallback(cb, { timeout });
    }
    return window.setTimeout(cb, timeout);
  };

  // Optimized thumbnail capture with throttling and lower resource usage
  const captureThumbnail = useCallback(async () => {
    const targetElement = document.documentElement;
    const minimapElement = minimapRef.current;
    if (!minimapElement || document.visibilityState !== 'visible') return;

    // Throttle captures
    const now = Date.now();
    if (now - lastCaptureAtRef.current < 3000) return; // Max once every 3 seconds
    lastCaptureAtRef.current = now;

    // Only show loading state if not already hidden
    const wasHidden = minimapElement.classList.contains(styles['hidden']);
    if (!wasHidden) {
      minimapElement.style.opacity = '0.5';
      // Force repaint before capture
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    
    try {
      const dataUrl = await toPng(targetElement, {
        width: Math.min(1920, targetElement.offsetWidth), // Cap max width
        height: Math.min(8000, targetElement.scrollHeight), // Cap max height
        skipFonts: true,
        pixelRatio: 0.3, // Further reduced for better performance
        cacheBust: false, // Disable cache busting for better performance
        backgroundColor: 'transparent',
        quality: 0.5, // Lower quality for better performance
        skipAutoScale: true,
        filter: (node) => {
          // Skip hidden elements
          if (node instanceof HTMLElement) {
            const style = window.getComputedStyle(node);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
              return false;
            }
          }
          return true;
        }
      });
      
      // Only update if the data URL is different to prevent unnecessary re-renders
      if (lastDataUrlRef.current !== dataUrl) {
        setThumbnail(dataUrl);
        lastDataUrlRef.current = dataUrl;
      }
    } catch (error) {
      console.warn('Minimap capture failed:', error);
    } finally {
      if (!wasHidden) {
        minimapElement.style.opacity = '1';
      }
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

  // Debounced scroll position update with optimized performance
  const updateScrollPosition = useCallback(() => {
    if (!minimapRef.current) return;
    
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
      const maxScroll = Math.max(1, scrollHeight - viewportHeight);
      const ratio = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
      
      const indicator = minimapRef.current?.querySelector<HTMLElement>(`.${styles['minimap-indicator']}`);
      if (indicator) {
        const indicatorHeightValue = Math.min(100, Math.max(0, (viewportHeight / scrollHeight) * 100));
        const maxPosition = Math.max(0, 100 - indicatorHeightValue);
        const position = Math.min(maxPosition, Math.max(0, ratio * maxPosition));
        
        // Use transform for better performance than top/height
        indicator.style.transform = `translateY(${position}%)`;
        indicator.style.height = `${indicatorHeightValue}%`;
      }
      
      setScrollPosition(Math.round(ratio * 100));
    });
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
