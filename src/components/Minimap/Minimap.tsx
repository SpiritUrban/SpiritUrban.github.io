import React, { useRef, useEffect, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import styles from './Minimap.module.css';

interface MinimapProps {
  contentRef: React.RefObject<HTMLElement>;
  viewportRef?: React.RefObject<HTMLElement>;
  className?: string;
  /** How the screenshot should scale inside the minimap: 'contain' | 'cover' | '100% auto' | 'auto 100%' */
  fit?: 'contain' | 'cover' | '100% auto' | 'auto 100%';
  /** Background position, e.g. 'center', 'top center' */
  position?: string;
}

const Minimap: React.FC<MinimapProps> = ({
  contentRef,
  viewportRef,
  className = '',
  fit = 'cover',
  position = 'center',
}) => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Guards / caches for capture
  const lastCaptureAtRef = useRef(0);
  const lastDataUrlRef = useRef('');

  // Idle helper with fallback
  const idle = (cb: () => void, timeout = 1500) => {
    if (typeof (window as any).requestIdleCallback === 'function') {
      return (window as any).requestIdleCallback(cb, { timeout });
    }
    return window.setTimeout(cb, timeout);
  };

  // Lightweight page thumbnail capture (throttled, no size overrides from props)
  const captureThumbnail = useCallback(async () => {
    const targetElement = document.documentElement;
    const minimapElement = minimapRef.current;
    if (!minimapElement || document.visibilityState !== 'visible') return;

    // throttle
    const now = Date.now();
    if (now - lastCaptureAtRef.current < 3000) return;
    lastCaptureAtRef.current = now;

    const prevOpacity = minimapElement.style.opacity;
    minimapElement.style.opacity = '0.5';
    await new Promise(r => requestAnimationFrame(r));

    try {
      const dataUrl = await toPng(targetElement, {
        width: Math.min(1920, targetElement.scrollWidth || targetElement.clientWidth || window.innerWidth),
        height: Math.min(8000, targetElement.scrollHeight),
        pixelRatio: 0.3,
        skipFonts: true,
        backgroundColor: 'transparent',
        cacheBust: false,
        filter: (node) => {
          if (node instanceof HTMLElement) {
            const cs = getComputedStyle(node);
            if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
          }
          return true;
        },
      });

      if (dataUrl && dataUrl !== lastDataUrlRef.current) {
        lastDataUrlRef.current = dataUrl;
        setThumbnail(dataUrl);
      }
    } catch {
      // тихо игнорируем — оставляем предыдущий thumbnail
    } finally {
      minimapElement.style.opacity = prevOpacity || '1';
    }
  }, []);

  // Рекапчер при изменении контента (resize/mutation) — в idle
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => idle(() => captureThumbnail(), 1200));
    ro.observe(el);

    const mo = new MutationObserver(() => idle(() => captureThumbnail(), 1200));
    mo.observe(el, { childList: true, subtree: true, attributes: true, characterData: true });

    // initial
    idle(() => captureThumbnail(), 300);

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [contentRef, captureThumbnail]);

  // Обновление позиции индикатора при скролле/резайзе (в пикселях)
  const updateScrollPosition = useCallback(() => {
    if (!minimapRef.current || isDragging) return;

    const doc = document.documentElement;
    const body = document.body;

    const scrollTop = Math.max(0, window.scrollY || doc.scrollTop || 0);
    const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);

    const ratio = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

    const container = minimapRef.current.querySelector<HTMLElement>(`.${styles['minimap-thumbnail']}`);
    const indicator = minimapRef.current.querySelector<HTMLElement>(`.${styles['minimap-indicator']}`);
    if (container && indicator) {
      const rect = container.getBoundingClientRect();
      const indicatorHeightPx = Math.max(8, (viewportHeight / scrollHeight) * rect.height);
      const draggableHeight = Math.max(1, rect.height - indicatorHeightPx);
      const positionPx = Math.min(draggableHeight, Math.max(0, ratio * draggableHeight));

      // двигаем индикатор по контейнеру в пикселях
      indicator.style.transform = `translateY(${positionPx}px)`;
      indicator.style.height = `${indicatorHeightPx}px`;
    }

    setScrollPosition(Math.round(ratio * 100));
  }, [viewportRef, isDragging]);

  // Листенеры скролла/резайза + lazy recapture
  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollPosition);

      if (!isDragging) idle(() => captureThumbnail(), 1200);
    };

    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollPosition);
      idle(() => captureThumbnail(), 1200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // initial
    updateScrollPosition();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateScrollPosition, captureThumbnail, isDragging]);

  // Преобразование клика/позиции курсора на миникарте -> scrollTop страницы
  const scrollToMinimapY = useCallback((clientY: number) => {
    if (!minimapRef.current) return;

    const container = minimapRef.current.querySelector<HTMLElement>(`.${styles['minimap-thumbnail']}`);
    if (!container) return;

    const doc = document.documentElement;
    const body = document.body;

    const rect = container.getBoundingClientRect();
    const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);

    const indicatorHeightPx = Math.max(8, (viewportHeight / scrollHeight) * rect.height);
    const draggableHeight = Math.max(1, rect.height - indicatorHeightPx);

    // позиция курсора внутри контейнера
    const yInside = clientY - rect.top;

    // центрируем индикатор под курсором
    const positionPx = Math.min(
      draggableHeight,
      Math.max(0, yInside - indicatorHeightPx / 2)
    );

    const ratio = positionPx / draggableHeight;
    const newScrollTop = Math.round(ratio * maxScroll);

    window.scrollTo({ top: newScrollTop, behavior: isDragging ? 'auto' : 'smooth' });
  }, [viewportRef, isDragging]);

  // Клик по миникарте
  const handleMinimapClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToMinimapY(e.clientY);
  }, [scrollToMinimapY]);

  // Drag logic
  useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      scrollToMinimapY(e.clientY);
    };
    const onUp = () => setIsDragging(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onUp);
    };
  }, [isDragging, scrollToMinimapY]);

  return (
    <div
      ref={minimapRef}
      className={`${styles['minimap-container']} ${className}`}
      style={
        {
          // размеры только из CSS; передаём сюда лишь фон
          '--minimap-thumbnail-bg': thumbnail ? `url(${thumbnail})` : 'none',
          '--minimap-fit': fit,
          '--minimap-position': position,
        } as React.CSSProperties
      }
      role="region"
      aria-label="Page navigation"
    >
      <div className={styles['minimap-thumbnail']}>
        <div
          className={styles['minimap-interaction-layer']}
          onClick={handleMinimapClick}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
            // моментально позиционируем по текущему курсору
            scrollToMinimapY(e.clientY);
          }}
          onDragStart={(e) => { e.preventDefault(); return false; }}
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
