import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { toPng } from 'html-to-image';
import './Minimap.css';

// Custom interface for slider props
interface SliderProps {
  'aria-valuenow': number;
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-valuetext'?: string;
  'aria-orientation'?: 'vertical' | 'horizontal';
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

interface MinimapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof SliderProps>, SliderProps {
  contentRef: React.RefObject<HTMLElement | null>;
  viewportRef?: React.RefObject<HTMLElement | null>;
  width?: number;
  height?: number;
}

const Minimap: React.FC<MinimapProps> = ({
  contentRef,
  viewportRef,
  width = 200,
  height = 400
}) => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Memoize the indicator height calculation
  const indicatorHeight = useMemo(() => {
    if (!contentRef.current) return '20%';
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const heightRatio = (viewportHeight / scrollHeight) * 100;
    return `${Math.max(heightRatio, 5)}%`;
  }, [contentRef, viewportRef]);
  
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
  
  // Update scroll position indicator
  const updateScrollPosition = useCallback(() => {
    if (!contentRef.current) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    const ratio = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
    
    setScrollPosition(ratio * 100);
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
  
  // Capture page thumbnail
  const captureThumbnail = useCallback(async () => {
    if (!contentRef.current) return;
    
    try {
      const dataUrl = await toPng(contentRef.current, {
        width: width * 2,  // Higher resolution for better quality
        height: contentRef.current.scrollHeight * (width / contentRef.current.offsetWidth),
        style: {
          transform: `scale(${width / contentRef.current.offsetWidth})`,
          transformOrigin: 'top left'
        }
      });
      setThumbnail(dataUrl);
    } catch (error) {
      console.error('Error capturing thumbnail:', error);
    }
  }, [contentRef, width]);
  
  // Update thumbnail when content changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      captureThumbnail();
    });

    if (contentRef.current) {
      captureThumbnail();
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    }

    return () => observer.disconnect();
  }, [captureThumbnail, contentRef]);
  
  // Set container style with width and height
  useEffect(() => {
    if (minimapRef.current) {
      minimapRef.current.style.setProperty('--minimap-width', `${width}px`);
      minimapRef.current.style.setProperty('--minimap-height', `${height}px`);
      minimapRef.current.style.setProperty('--indicator-height', indicatorHeight);
    }
  }, [width, height, indicatorHeight]);

  return (
    <div 
      ref={minimapRef}
      className="minimap-container"
      style={{
        '--minimap-width': `${width}px`,
        '--minimap-height': `${height}px`,
        '--indicator-height': indicatorHeight,
        '--indicator-position': `${scrollPosition}%`
      } as React.CSSProperties}
      role="region"
      aria-label="Page navigation"
    >
      <div 
        className="minimap-thumbnail"
        style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : 'none' }}
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
        role="slider"
        tabIndex={0}
        aria-valuenow={Math.round(scrollPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(scrollPosition)}% scrolled`}
        aria-orientation="vertical"
        aria-label="Document scroll position"
      />
      <div 
        className="minimap-indicator"
        style={{ top: `calc(${scrollPosition}% - var(--indicator-height) / 2)` }}
        aria-hidden="true"
      />
    </div>
  );
};

export default Minimap;
