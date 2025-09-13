import React, { useRef, useEffect } from 'react';
import styles from './TechnologiesList.module.css';

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  // Update center point when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        // Force re-render by updating the ref
        svgRef.current.getBoundingClientRect();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to calculate the path for the curve
  const getPath = (startX: number, startY: number) => {
    // Control points for the curve
    const cp1x = startX + (center.x - startX) * 0.5;
    const cp1y = startY;
    const cp2x = cp1x;
    const cp2y = center.y;

    return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${center.x} ${center.y}`;
  };

  return (
    <svg 
      ref={svgRef} 
      className={`${styles.connectionLines} ${styles.connectionSvg}`}
      width="100%" 
      height="100%"
    >
      {itemRefs.map((ref, index) => {
        if (!ref.current) return null;
        
        const rect = ref.current.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        
        return (
          <path
            key={index}
            d={getPath(startX, startY)}
            fill="none"
            stroke="rgba(0, 255, 157, 0.3)"
            strokeWidth="1"
            strokeLinecap="round"
            className={styles.connectionLine}
          />
        );
      })}
    </svg>
  );
};

export default ConnectionLines;
