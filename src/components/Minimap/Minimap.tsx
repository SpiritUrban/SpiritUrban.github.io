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
        
        // Always use the window's inner height as the viewport height
        // This ensures we're using the visible area height, not the scrollable content
        let vh = window.innerHeight;
        
        console.log('Viewport height set to:', vh);
        
        // If we have a specific viewport container, log its dimensions for debugging
        if (viewportRef?.current) {
          const container = viewportRef.current;
          const style = window.getComputedStyle(container);
          console.log('Viewport container dimensions:', {
            clientHeight: container.clientHeight,
            offsetHeight: container.clientHeight,
            scrollHeight: container.scrollHeight,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            computedHeight: style.height
          });
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
      const contentElement = contentRef.current;
      
      if (!contentElement) {
        console.log('Scroll: Content ref not available');
        return;
      }
      
      // Always use window for scrolling
      const scrollTop = window.scrollY;
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      
      const currentViewportHeight = window.innerHeight;
      const maxScroll = Math.max(1, scrollHeight - currentViewportHeight);
      const ratio = Math.min(scrollTop / maxScroll, 1);
      
      // Update viewport height in state if needed
      if (currentViewportHeight !== viewportHeight) {
        setViewportHeight(currentViewportHeight);
      }
      
      console.log('Scroll event:', {
        scrollTop,
        scrollHeight,
        viewportHeight: currentViewportHeight,
        maxScroll,
        ratio
      });
      
      setScrollRatio(ratio);
    };

    // Always use window for scrolling
    console.log('Adding scroll listener to window');
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      console.log('Cleaning up minimap listeners');
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
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
    
    // Always use window for scrolling
    const maxScroll = contentHeight - window.innerHeight;
    const newScrollTop = Math.max(0, Math.min(ratio * maxScroll, maxScroll));
    
    console.log('Scrolling to:', {
      maxScroll,
      newScrollTop,
      contentHeight,
      viewportHeight: window.innerHeight,
      ratio
    });
    
    // Always scroll the window
    window.scrollTo({
      top: newScrollTop,
      behavior: 'smooth',
    });
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

  // Set container dimensions using CSS variables
  const containerStyle = {
    '--minimap-width': `${width}px`,
    '--minimap-height': `${height}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.minimapContainer} style={containerStyle}>
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
