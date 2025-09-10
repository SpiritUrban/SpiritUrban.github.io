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

  // Log initial refs
  useEffect(() => {
    console.log('Minimap mounted with refs:', {
      contentRef: contentRef?.current ? 'Set' : 'Not set',
      viewportRef: viewportRef?.current ? 'Set' : 'Not set',
      minimapRef: minimapRef.current ? 'Set' : 'Not set'
    });
  }, []);

  // Update dimensions when content changes
  useEffect(() => {
    console.log('Updating dimensions...');
    if (!contentRef?.current) {
      console.log('Content ref not set, skipping dimension update');
      return;
    }

    const updateDimensions = () => {
      if (contentRef?.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        console.log('Content scroll height:', scrollHeight);
        setContentHeight(scrollHeight);
        
        // Always use the visible viewport height, not the scrollable content height
        let vh = window.innerHeight;
        
        if (viewportRef?.current && viewportRef.current !== document.documentElement) {
          // If we have a specific viewport container, use its client height
          // but only if it's not the document element
          const container = viewportRef.current;
          const style = window.getComputedStyle(container);
          const paddingTop = parseFloat(style.paddingTop) || 0;
          const paddingBottom = parseFloat(style.paddingBottom) || 0;
          
          vh = container.clientHeight - paddingTop - paddingBottom;
          console.log('Using container viewport height:', vh);
        } else {
          // Default to window height minus any fixed headers/footers if needed
          vh = window.innerHeight;
          console.log('Using window viewport height:', vh);
        }
        
        console.log('Setting viewport height:', vh);
        setViewportHeight(vh);
      } else {
        console.log('Content ref not available for dimension update');
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
      const scrollElement = viewportRef?.current || document.documentElement;
      const contentElement = contentRef.current;
      
      if (!contentElement) {
        console.log('Scroll: Content ref not available');
        return;
      }
      
      // Get scroll position from the correct element
      const scrollTop = scrollElement === document.documentElement 
        ? window.scrollY 
        : scrollElement.scrollTop;
        
      const scrollHeight = contentElement.scrollHeight;
      const clientHeight = scrollElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;
      
      console.log('Scroll event:', {
        scrollElement: scrollElement === document.documentElement ? 'document' : 'custom',
        scrollTop,
        scrollHeight,
        clientHeight,
        maxScroll,
        ratio
      });
      
      setScrollRatio(ratio);
    };

    // Set up scroll listener on the correct element
    const scrollElement = viewportRef?.current || document.documentElement;
    const scrollTarget = scrollElement === document.documentElement ? window : scrollElement;
    
    console.log('Adding scroll listener to:', 
      scrollElement === document.documentElement ? 'window' : 'custom element');
    
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      console.log('Cleaning up minimap listeners');
      resizeObserver.disconnect();
      scrollTarget.removeEventListener('scroll', handleScroll);
    };
  }, [contentRef, viewportRef]);

  // Handle minimap click/drag
  const handleMinimapInteraction = (e: React.MouseEvent) => {
    console.log('Minimap interaction:', e.type);
    
    if (!minimapRef.current) {
      console.log('Minimap ref not set');
      return;
    }
    
    if (!contentRef.current) {
      console.log('Content ref not set');
      return;
    }
    
    const rect = minimapRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const ratio = Math.min(Math.max(y / rect.height, 0), 1);
    
    console.log('Interaction details:', {
      clientY: e.clientY,
      rectTop: rect.top,
      rectHeight: rect.height,
      calculatedY: y,
      ratio,
      contentHeight,
      viewportHeight
    });
    
    const scrollElement = viewportRef?.current || document.documentElement;
    const maxScroll = contentHeight - viewportHeight;
    const newScrollTop = Math.max(0, Math.min(ratio * maxScroll, maxScroll));
    
    console.log('Scrolling to:', {
      scrollElement: scrollElement === document.documentElement ? 'document' : 'custom element',
      maxScroll,
      newScrollTop,
      contentHeight,
      viewportHeight,
      ratio
    });
    
    if (scrollElement === document.documentElement) {
      // For document scrolling
      window.scrollTo({
        top: newScrollTop,
        behavior: 'smooth',
      });
    } else if (scrollElement) {
      // For custom container scrolling
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
