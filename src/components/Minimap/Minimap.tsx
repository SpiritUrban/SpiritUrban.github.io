import React, { useRef, useEffect, useState } from 'react';
import styles from './Minimap.module.css';

interface MinimapProps {
  contentRef: React.RefObject<HTMLElement | null>;
  viewportRef?: React.RefObject<HTMLElement | null>;
  width?: number;
  height?: number;
}

const Minimap: React.FC<MinimapProps> = ({
  contentRef,
  viewportRef,
  width = 150,
  height = 300,
}) => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0);

  // Update dimensions when content changes
  useEffect(() => {
    if (!contentRef?.current) return;

    const updateDimensions = () => {
      if (contentRef?.current) {
        setContentHeight(contentRef.current.scrollHeight);
        
        let vh = window.innerHeight;
        if (viewportRef?.current) {
          // Check if it's a window-like object or an element
          if ('clientHeight' in viewportRef.current) {
            vh = viewportRef.current.clientHeight;
          } else if ('innerHeight' in viewportRef.current) {
            vh = (viewportRef.current as Window).innerHeight;
          }
        }
        
        setViewportHeight(vh);
      }
    };

    // Initial update
    updateDimensions();

    // Set up ResizeObserver to track content size changes
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    // Set up scroll event listener
    const handleScroll = () => {
      if (!contentRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const maxScroll = scrollHeight - clientHeight;
      setScrollRatio(maxScroll > 0 ? scrollTop / maxScroll : 0);
    };

    const scrollElement = viewportRef?.current || window;
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [contentRef, viewportRef]);

  // Handle minimap click/drag
  const handleMinimapInteraction = (e: React.MouseEvent) => {
    if (!minimapRef.current || !contentRef.current) return;
    
    const rect = minimapRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const ratio = Math.min(Math.max(y / rect.height, 0), 1);
    
    const scrollElement = viewportRef?.current || window;
    const maxScroll = contentHeight - viewportHeight;
    const newScrollTop = ratio * maxScroll;
    
    if (scrollElement instanceof Window) {
      scrollElement.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      });
    } else if (scrollElement) {
      scrollElement.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      });
    }
  };

  // Calculate viewport indicator position and height
  const indicatorHeight = contentHeight > 0 && viewportHeight > 0
    ? Math.max((viewportHeight / contentHeight) * 100, 5)
    : 20; // Default height if not calculated yet
  
  const indicatorTop = contentHeight > 0 ? scrollRatio * (100 - indicatorHeight) : 0;

  // Set custom properties directly on the container
  useEffect(() => {
    if (minimapRef.current) {
      minimapRef.current.style.setProperty('--indicator-top', `${indicatorTop}%`);
      minimapRef.current.style.setProperty('--indicator-height', `${indicatorHeight}%`);
    }
  }, [indicatorTop, indicatorHeight]);

  // Set container dimensions
  const containerClasses = [
    styles.minimapContainer,
    width && styles.hasCustomWidth,
    height && styles.hasCustomHeight
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClasses}
      style={{
        '--minimap-width': `${width}px`,
        '--minimap-height': `${height}px`,
      } as React.CSSProperties}
    >
      <div 
        ref={minimapRef}
        className={styles.minimap}
        onClick={handleMinimapInteraction}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMinimapInteraction(e);
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            handleMinimapInteraction(e);
          }
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div className={styles.viewportIndicator} />
      </div>
    </div>
  );
};

export default Minimap;
