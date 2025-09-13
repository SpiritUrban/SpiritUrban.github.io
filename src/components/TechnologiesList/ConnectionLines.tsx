import React, { useRef, useEffect } from 'react';
import styles from './TechnologiesList.module.css';

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLElement | null>;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs, containerRef }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const leftPanelRef = useRef<HTMLElement | null>(null);
  const rafId = useRef<number | null>(null);
  
  // Update paths on scroll/resize or when items change
  useEffect(() => {
    if (!svgRef.current) return;
    
    let lastUpdate = 0;
    const UPDATE_INTERVAL = 16; // ~60fps
    
    // Function to update all paths
    const updateAllPaths = () => {
      const now = Date.now();
      if (now - lastUpdate > UPDATE_INTERVAL) {
        // Force re-render by toggling a class
        if (svgRef.current) {
          svgRef.current.classList.toggle('force-update');
        }
        lastUpdate = now;
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

    // Force immediate update for scroll events
    const handleScroll = () => {
      // Force synchronous update
      if (svgRef.current) {
        svgRef.current.classList.toggle('force-update');
        // Force reflow
        svgRef.current.getBoundingClientRect();
        svgRef.current.classList.toggle('force-update');
      }
    };

    // Add event listeners
    const container = containerRef.current;
    
    // Find the left panel element
    leftPanelRef.current = document.querySelector('.left');
    
    // Use different approaches for different events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', throttledUpdate);
    
    // Listen to scroll on the .left panel which contains the technologies list
    if (leftPanelRef.current) {
      // Add multiple event types to catch all possible scroll scenarios
      const scrollEvents = ['scroll', 'wheel', 'touchmove', 'pointermove'];
      scrollEvents.forEach(event => {
        leftPanelRef.current?.addEventListener(event, handleScroll, { passive: true });
      });
      
      // Add intersection observer to track when elements come into view
      const observer = new IntersectionObserver(
        () => handleScroll(),
        { root: leftPanelRef.current, threshold: 0.1 }
      );
      
      // Observe all technology items
      itemRefs.forEach(ref => {
        if (ref.current) observer.observe(ref.current);
      });
      
      // Initial update with a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        handleScroll();
      }, 100);
      
      // Cleanup function for the observer and timer
      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }
    
    // Initial update
    updateAllPaths();
    
    // Set up a more aggressive mutation observer
    const observer = new MutationObserver(() => {
      updateAllPaths();
    });
    
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
        attributeFilter: ['class', 'style']
      });
    }
    
    return () => {
      // Clean up
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      
      // Remove all event listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', throttledUpdate);
      
      // Clean up left panel listeners
      if (leftPanelRef.current) {
        leftPanelRef.current.removeEventListener('scroll', handleScroll);
        leftPanelRef.current.removeEventListener('wheel', handleScroll);
      }
      
      // Clean up observer
      if (containerRef.current) {
        observer.disconnect();
      }
      
      // Force one final update to clear any pending states
      if (svgRef.current) {
        svgRef.current.classList.remove('force-update');
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
