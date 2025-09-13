import React, { useRef, useEffect } from 'react';
import styles from './TechnologiesList.module.css';

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLElement | null>;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs, containerRef }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Update paths on scroll/resize or when items change
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Function to update all paths
    const updateLines = () => {
      if (svgRef.current) {
        // Force re-render by toggling a class
        svgRef.current.classList.toggle('force-update');
        // Force reflow
        svgRef.current.getBoundingClientRect();
        svgRef.current.classList.toggle('force-update');
      }
    };

    // Find the left panel element
    const leftPanel = document.querySelector('.left');
    
    // Add scroll event to window
    window.addEventListener('scroll', updateLines, { passive: true });
    
    // Add scroll event to left panel if it exists
    if (leftPanel) {
      leftPanel.addEventListener('scroll', updateLines, { passive: true });
    }
    
    // Initial update
    updateLines();
    
    // Cleanup function
    return () => {
      // Remove event listeners
      window.removeEventListener('scroll', updateLines);
      
      // Remove left panel listeners
      const leftPanel = document.querySelector('.left');
      if (leftPanel) {
        leftPanel.removeEventListener('scroll', updateLines);
      }
      
      // Clear any pending updates
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
