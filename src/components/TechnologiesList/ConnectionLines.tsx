import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './TechnologiesList.module.css';

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLElement | null>;
  timelineRef?: React.RefObject<HTMLElement | null>;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs }) => {
  const [_, setForceUpdate] = useState(0);
  const rafId = useRef<number>();
  
  // Memoize the update function to prevent unnecessary re-renders
  const updateLines = useCallback((): void => {
    const currentRafId = rafId.current;
    if (currentRafId !== undefined) {
      cancelAnimationFrame(currentRafId);
    }
    const frameId = requestAnimationFrame((): void => {
      setForceUpdate(prev => prev + 1);
    });
    rafId.current = frameId;
  }, [rafId]); // Include rafId in deps to satisfy TypeScript
  

  // Set up scroll and resize listeners with proper dependencies
  useEffect((): (() => void) => {
    if (itemRefs.length === 0) {
      return () => {}; // Return a no-op cleanup function
    }

    const leftPanel = document.querySelector('.left');
    const timeline = timelineRef?.current;
    
    // Throttle the update function to improve performance
    let lastUpdate = 0;
    const throttledUpdate = () => {
      const now = Date.now();
      if (now - lastUpdate >= 16) { // ~60fps
        lastUpdate = now;
        updateLines();
      }
    };
    
    // Add event listeners with passive: true for better performance
    const options = { passive: true } as AddEventListenerOptions;
    window.addEventListener('scroll', throttledUpdate, options);
    window.addEventListener('resize', throttledUpdate, options);
    
    if (leftPanel) {
      leftPanel.addEventListener('scroll', throttledUpdate, options);
    }
    
    if (timeline) {
      timeline.addEventListener('scroll', throttledUpdate, options);
    }
    
    // Initial update with a small delay to ensure all elements are rendered
    const initTimer = setTimeout(updateLines, 100);
    
    // Cleanup function
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      clearTimeout(initTimer);
      
      // Remove event listeners
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('resize', throttledUpdate);
      
      if (leftPanel) {
        leftPanel.removeEventListener('scroll', throttledUpdate);
      }
      
      if (timeline) {
        timeline.removeEventListener('scroll', throttledUpdate);
      }
    };
  }, [itemRefs, updateLines, timelineRef]);

  // Function to calculate the path for the curve
  const getPath = useCallback((startX: number, startY: number): string => {
    const centerX = globalThis.window.innerWidth / 2;
    const centerY = globalThis.window.innerHeight / 2;
    
    const cpX = startX + (centerX - startX) * 0.33;
    const cpY = startY;
    const cp2X = cpX + (centerX - cpX) * 0.5;
    const cp2Y = centerY;
    
    return `M ${startX} ${startY} C ${cpX} ${cpY}, ${cp2X} ${cp2Y}, ${centerX} ${centerY}`;
  }, []);

  // Get fresh positions for rendering with proper scroll handling
  const getPositions = useCallback((): Array<{x: number, y: number, visible: boolean}> => {
    if (!itemRefs.length) return [];
    
    // Get viewport dimensions with some padding
    const viewportPadding = 200; // pixels
    const viewportTop = -viewportPadding;
    const viewportBottom = window.innerHeight + viewportPadding;
    const viewportLeft = -viewportPadding;
    const viewportRight = window.innerWidth + viewportPadding;
    
    return itemRefs
      .filter((ref): ref is { current: HTMLDivElement } => ref.current !== null)
      .map(ref => {
        const rect = ref.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Check if element is in or near the viewport
        const isVisible = (
          y >= viewportTop && 
          y <= viewportBottom &&
          x >= viewportLeft &&
          x <= viewportRight
        );
        
        return { x, y, visible: isVisible };
      });
  }, [itemRefs]);

  const positions = getPositions();
  
  return (
    <div className={styles.connectionLinesWrapper}>
      <svg 
        className={`${styles.connectionSvg} ${styles.connectionSvgFixed}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        {positions.map((pos, index) => (
          <path
            key={`line-${index}`}
            d={getPath(pos.x, pos.y)}
            className={`${styles.connectionLine} ${styles.connectionLineAnimated} ${pos.visible ? styles.visible : ''}`}
            style={{
              opacity: pos.visible ? 0.3 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default ConnectionLines;
