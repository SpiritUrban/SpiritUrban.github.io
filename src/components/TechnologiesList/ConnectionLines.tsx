import React, { useRef, useEffect } from 'react';
import styles from './TechnologiesList.module.css';

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Update paths on scroll/resize
  useEffect(() => {
    const updatePaths = () => {
      if (!svgRef.current) return;
      
      // Force re-render by toggling a class
      svgRef.current.classList.toggle('force-update');
    };

    window.addEventListener('scroll', updatePaths, { passive: true });
    window.addEventListener('resize', updatePaths);
    
    return () => {
      window.removeEventListener('scroll', updatePaths);
      window.removeEventListener('resize', updatePaths);
    };
  }, []);

  // Function to calculate the path for the curve
  const getPath = (startX: number, startY: number) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Simple quadratic curve
    const cpX = startX + (centerX - startX) / 2;
    const cpY = startY;
    
    return `M ${startX} ${startY} Q ${cpX} ${cpY}, ${centerX} ${centerY}`;
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
        if (!ref.current) return null;
        
        const rect = ref.current.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        
        // Skip if element is not in viewport
        if (startY < 0 || startY > window.innerHeight) return null;
        if (startX < 0 || startX > window.innerWidth) return null;
        
        return (
          <path
            key={index}
            d={getPath(startX, startY)}
            fill="none"
            stroke="rgba(0, 255, 157, 0.3)"
            strokeWidth="1"
            strokeLinecap="round"
            className={`${styles.connectionLine} ${styles.connectionLineAnimated}`}
          />
        );
      })}
      </svg>
    </div>
  );
};

export default ConnectionLines;
