import React, { useRef, useEffect } from 'react';
import styles from './TechnologiesList.module.css';

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLElement | null>;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs, containerRef }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const rafId = useRef<number | null>(null);
  
  // Update paths on scroll/resize or when items change
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Function to update all paths
    const updateAllPaths = () => {
      // Force re-render by toggling a class
      if (svgRef.current) {
        svgRef.current.classList.toggle('force-update');
      }
    };

    // Throttled update function
    const throttledUpdate = () => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          updateAllPaths();
          rafId.current = null;
        });
      }
    };

    // Add event listeners
    const container = containerRef.current;
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('resize', throttledUpdate);
    
    // Listen to scroll on container if it exists
    if (container) {
      container.addEventListener('scroll', throttledUpdate, { passive: true });
    }
    
    // Initial update
    updateAllPaths();
    
    // Set up a mutation observer to watch for changes in the container
    const observer = new MutationObserver(throttledUpdate);
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    }
    
    return () => {
      // Clean up
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('resize', throttledUpdate);
      
      if (container) {
        container.removeEventListener('scroll', throttledUpdate);
        observer.disconnect();
      }
    };
  }, [containerRef, itemRefs]); // Add itemRefs to dependencies

  // Function to calculate the path for the curve
  const getPath = (startX: number, startY: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Calculate control points for a smooth curve
    const cpX = startX + (centerX - startX) * 0.5;
    const cpY = startY;
    const cp2X = cpX;
    const cp2Y = centerY;
    
    // Use cubic bezier for smoother curves
    return `M ${startX} ${startY} C ${cpX} ${cpY}, ${cp2X} ${cp2Y}, ${centerX} ${centerY}`;
  };

  return (
    <div className={styles.connectionLinesWrapper}>
      <svg 
        ref={svgRef}
        className={`${styles.connectionSvg} ${styles.connectionSvgFixed}`}
        width="100%"
        height="100%"
      >
      {itemRefs.map((ref, index) => {
        try {
          if (!ref?.current) return null;
          
          const rect = ref.current.getBoundingClientRect();
          const startX = rect.left + rect.width / 2;
          const startY = rect.top + rect.height / 2;
          
          // Don't skip based on viewport to ensure all lines are rendered
          // This helps with smooth transitions when scrolling
          
          return (
            <path
              key={`line-${index}`}
              d={getPath(startX, startY)}
              className={`${styles.connectionLine} ${styles.connectionLineAnimated} ${
                (startY >= 0 && startY <= window.innerHeight && 
                 startX >= 0 && startX <= window.innerWidth) ? styles.visible : ''
              }`}
            />
          );
        } catch (error) {
          console.error('Error rendering connection line:', error);
          return null;
        }
      })}
      </svg>
    </div>
  );
};

export default ConnectionLines;
