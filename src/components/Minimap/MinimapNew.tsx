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

const Minimap: React.FC<MinimapProps> = ({
  contentRef,
  viewportRef,
  width = 200,
  height = 400,
  className = ''
}) => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Capture page thumbnail
  const captureThumbnail = useCallback(async () => {
    if (!contentRef.current) return;
    
    setIsLoading(true);
    const minimapElement = minimapRef.current;
    if (minimapElement) {
      minimapElement.classList.add(styles['hidden']);
    }
    
    try {
      const contentWidth = contentRef.current.offsetWidth;
      const contentHeight = contentRef.current.scrollHeight;
      const scale = width / contentWidth;
      
      console.log('Capturing screenshot with dimensions:', {
        contentWidth,
        contentHeight,
        scale,
        minimapWidth: width,
        minimapHeight: height
      });
      
      const dataUrl = await toPng(contentRef.current, {
        width: contentWidth,
        height: contentHeight,
        backgroundColor: 'transparent',
        pixelRatio: 1,
        cacheBust: true,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left'
        }
      });
      
      setThumbnail(dataUrl);
    } catch (error) {
      console.error('Error capturing thumbnail:', error);
      setThumbnail('');
    } finally {
      setIsLoading(false);
      if (minimapRef.current) {
        setTimeout(() => {
          if (minimapRef.current) {
            minimapRef.current.classList.remove(styles['hidden']);
          }
        }, 100);
      }
    }
  }, [contentRef, width, height]);

  // Update thumbnail when content changes
  useEffect(() => {
    if (!contentRef.current) return;
    
    const observer = new MutationObserver(() => {
      captureThumbnail();
    });
    
    // Initial capture
    captureThumbnail();
    
    // Observe content changes
    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
    
    // Cleanup
    return () => observer.disconnect();
  }, [contentRef, captureThumbnail]);

  // Handle scroll updates
  const updateScrollPosition = useCallback(() => {
    if (!contentRef.current || !minimapRef.current) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    const ratio = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
    
    const indicator = minimapRef.current.querySelector(`.${styles['minimap-indicator']}`) as HTMLElement;
    if (indicator) {
      const indicatorHeight = (viewportHeight / scrollHeight) * 100;
      const maxPosition = 100 - indicatorHeight;
      const position = ratio * maxPosition;
      
      indicator.style.setProperty('--indicator-top', `${position}%`);
      indicator.style.setProperty('--indicator-height', `${indicatorHeight}%`);
    }
  }, [contentRef, viewportRef]);

  // Set up scroll and resize listeners
  useEffect(() => {
    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    window.addEventListener('resize', updateScrollPosition);
    
    // Initial update
    updateScrollPosition();
    
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', updateScrollPosition);
    };
  }, [updateScrollPosition]);

  // Handle minimap click/drag
  const handleMinimapInteraction = useCallback((e: React.MouseEvent) => {
    if (!minimapRef.current || !contentRef.current) return;
    
    const rect = minimapRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const ratio = Math.min(Math.max(y / rect.height, 0), 1);
    
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    const newScrollTop = ratio * maxScroll;

    window.scrollTo({
      top: newScrollTop,
      behavior: 'smooth',
    });
  }, [contentRef, viewportRef]);

  return (
    <div 
      ref={minimapRef}
      className={`${styles['minimap-container']} ${className}`}
      style={{
        '--minimap-width': `${width}px`,
        '--minimap-height': `${height}px`,
        '--minimap-thumbnail-bg': thumbnail ? `url(${thumbnail})` : 'none'
      } as React.CSSProperties}
      role="region"
      aria-label="Page navigation"
    >
      <div className={styles['minimap-thumbnail']}>
        <div 
          className={styles['minimap-interaction-layer']}
          onClick={handleMinimapInteraction}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMinimapInteraction(e);
          }}
          onMouseMove={(e) => {
            if (isDragging) handleMinimapInteraction(e);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          tabIndex={0}
        />
        <div 
          className={styles['minimap-indicator']}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Minimap;
