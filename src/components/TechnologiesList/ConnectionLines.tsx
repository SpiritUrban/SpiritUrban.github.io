import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './TechnologiesList.module.css';

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLElement | null>;
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
    // This effect depends on updateLines and itemRefs
    if (itemRefs.length === 0) {
      return () => {}; // Return a no-op cleanup function
    }

    const leftPanel = document.querySelector('.left');
    
    // Add event listeners
    window.addEventListener('scroll', updateLines, { passive: true });
    window.addEventListener('resize', updateLines);
    
    if (leftPanel) {
      leftPanel.addEventListener('scroll', updateLines, { passive: true });
    }
    
    // Initial update
    updateLines();
    
    // Cleanup function
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      // Remove event listeners
      window.removeEventListener('scroll', updateLines);
      
      if (leftPanel) {
        leftPanel.removeEventListener('scroll', updateLines);
      }
    };
  }, [itemRefs, updateLines]); // Add dependencies to the effect

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

  // Get fresh positions for rendering
  const getPositions = useCallback((): Array<{x: number, y: number}> => {
    return itemRefs
      .filter((ref): ref is { current: HTMLDivElement } => ref.current !== null)
      .map(ref => {
        const rect = ref.current.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      });
  }, [itemRefs]);

  const positions = getPositions();
  
  return (
    <div className={styles.connectionLinesWrapper}>
      <svg 
        className={`${styles.connectionSvg} ${styles.connectionSvgFixed}`}
        width="100%"
        height="100%"
      >
        {positions.map((pos, index) => {
          const { x: startX, y: startY } = pos;
          const isVisible = (
            startY >= 0 && 
            startY <= window.innerHeight && 
            startX >= 0 && 
            startX <= window.innerWidth
          );
          
          return (
            <path
              key={`line-${index}`}
              d={getPath(startX, startY)}
              className={`${styles.connectionLine} ${styles.connectionLineAnimated} ${isVisible ? styles.visible : ''}`}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ConnectionLines;
