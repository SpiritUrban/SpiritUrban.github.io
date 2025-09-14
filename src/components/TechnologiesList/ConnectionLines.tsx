import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectVisibleItems } from '../../features/timeline/timelineSelectors';
import styles from './TechnologiesList.module.css';

interface TimelineItem {
  index: number;
  technologies: Array<{ name: string }>;
}

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLElement | null>;
  timelineRef?: React.RefObject<HTMLElement | null>;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs, timelineRef }) => {
  const [_, setForceUpdate] = useState(0);
  const rafId = useRef<number>();
  const monitorInterval = useRef<NodeJS.Timeout>();
  const svgRef = useRef<SVGSVGElement>(null);
  const isMounted = useRef(true);
  
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
  

  // Auto-scroll timeline to ensure proper rendering
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const scrollTimeline = async () => {
      try {
        // Wait for the DOM to be fully loaded
        await new Promise(resolve => {
          if (document.readyState === 'complete') {
            resolve(true);
          } else {
            window.addEventListener('load', () => resolve(true));
          }
        });
        
        // Additional delay to ensure everything is ready
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const timeline = timelineRef?.current;
        if (!timeline) return;
        
        // Save current scroll position
        const startScroll = timeline.scrollTop;
        const scrollAmount = 100; // Increased scroll amount
        
        // Function to force reflow and repaint
        const forceReflow = () => {
          if (!svgRef.current) return;
          // Trigger reflow by toggling visibility
          const svg = svgRef.current as unknown as HTMLElement;
          const originalDisplay = svg.style.display;
          svg.style.display = 'none';
          // Force repaint
          void svg.offsetHeight;
          svg.style.display = originalDisplay || '';
        };
        
        // Initial render
        updateLines();
        forceReflow();
        
        // Scroll down
        timeline.scrollTo({ top: startScroll + scrollAmount, behavior: 'smooth' });
        
        // Scroll back up after a delay
        setTimeout(() => {
          timeline.scrollTo({ top: startScroll, behavior: 'smooth' });
          // Final update after all scrolling
          setTimeout(() => {
            updateLines();
            forceReflow();
          }, 500);
        }, 500);
        
      } catch (error) {
        console.error('Error during auto-scroll:', error);
      }
    };
    
    scrollTimeline();
    
    // No cleanup needed for this effect
  }, [timelineRef, updateLines]);
  
  // Monitor for missing paths and force redraw if needed
  useEffect(() => {
    const checkAndFixMissingPaths = (isInitial = false) => {
      if (!svgRef.current || !isMounted.current) return false;
      
      // Check if there are any path elements
      const hasPaths = svgRef.current.querySelectorAll('path').length > 0;
      const shouldHavePaths = itemRefs.length > 0;
      
      // If we should have paths but don't, force a redraw
      if (shouldHavePaths && !hasPaths) {
        console.log('Missing paths detected, forcing redraw...');
        updateLines();
        return true; // Redraw was triggered
      }
      return false; // No redraw was needed
    };
    
    // Initial rendering sequence
    const initialRenderSequence = async () => {
      // First immediate render
      updateLines();
      
      // Then check and retry with increasing delays
      const delays = [50, 100, 200, 500, 1000];
      for (const delay of delays) {
        await new Promise(resolve => setTimeout(resolve, delay));
        if (!checkAndFixMissingPaths(true)) break;
      }
    };
    
    // Start initial render sequence
    initialRenderSequence();
    
    // Set up periodic checking
    monitorInterval.current = setInterval(() => checkAndFixMissingPaths(), 2000);
    
    return () => {
      isMounted.current = false;
      if (monitorInterval.current) {
        clearInterval(monitorInterval.current);
      }
    };
  }, [itemRefs.length, updateLines]);
  
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

  const visibleCards = useAppSelector(selectVisibleItems);

  // Define types for card positions
  interface CardPosition {
    x: number;
    y: number;
    visible: boolean;
  }

  // Function to get card positions for a specific technology
  const getCardPositions = useCallback((techName: string): CardPosition[] => {
    const cards: CardPosition[] = [];
    
    // Find all cards that have this technology in their data-card-technologies attribute
    const cardElements = document.querySelectorAll(`[data-card-technologies*="${techName}"]`);
    
    cardElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      cards.push({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        visible: true
      });
    });
    
    console.log(`Found ${cards.length} cards for technology: ${techName}`);
    return cards;
  }, [visibleCards]);

  // Define types for connection lines
  interface ConnectionLine {
    id: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    visible: boolean;
  }

  // Get all connection lines to render
  const getConnectionLines = useCallback((): ConnectionLine[] => {
    if (!itemRefs.length) return [];
    
    const lines: ConnectionLine[] = [];
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const maxY = viewportHeight;
    
    // Function to check if a point is in the viewport
    const isInViewport = (y: number): boolean => {
      return y >= 0 && y <= maxY;
    };
    
    // Function to cap Y coordinate to viewport bounds
    const capY = (y: number): number => {
      return Math.max(0, Math.min(y, maxY));
    };
    
    itemRefs.forEach((ref, index) => {
      if (!ref.current) return;
      
      const techName = ref.current.getAttribute('data-tech-name');
      if (!techName) return;
      
      const techRect = ref.current.getBoundingClientRect();
      // Start from the right side of the technology item
      const startX = techRect.right;
      // Keep the vertical center
      const startY = techRect.top + techRect.height / 2;
      
      // Get all cards that use this technology
      const cards = getCardPositions(techName);
      
      cards.forEach((card, cardIndex) => {
        // Only draw if either point is in the viewport
        if (isInViewport(startY) || isInViewport(card.y)) {
          const lineId = `line-${index}-${cardIndex}-${techName}`;
          
          // Cap Y coordinates to viewport bounds
          const cappedStartY = capY(startY);
          const cappedEndY = capY(card.y);
          
          lines.push({
            id: lineId,
            startX,
            startY: cappedStartY,
            endX: card.x,
            endY: cappedEndY,
            visible: true
          });
        }
      });
    });
    
    return lines;
  }, [itemRefs, getCardPositions]);
  
  const connectionLines = getConnectionLines();
  
  // Force update when window resizes or scrolls
  useEffect(() => {
    const handleResize = () => {
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, []);
  
  // Function to create a curved path between two points
  const createCurvedPath = (startX: number, startY: number, endX: number, endY: number) => {
    // Calculate control points for the curve
    // First control point is slightly to the right of the start
    const cp1x = startX + 50; // 50px to the right of the start
    const cp1y = startY;
    // Second control point is above or below the end point
    const cp2x = endX - 50; // 50px to the left of the end
    const cp2y = endY;
    
    return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
  };

  return (
    <div className={styles.connectionLinesWrapper}>
      <svg 
        ref={svgRef}
        className={`${styles.connectionSvg} ${styles.connectionSvgFixed}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        {connectionLines.map((line, index) => {
          // Skip invalid lines
          if (isNaN(line.startX) || isNaN(line.startY) || isNaN(line.endX) || isNaN(line.endY)) {
            console.warn('Skipping invalid line:', line);
            return null;
          }
          
          const pathData = createCurvedPath(line.startX, line.startY, line.endX, line.endY);
          
          return (
            <path
              key={line.id || `line-${index}`}
              d={pathData}
              fill="none"
              className={`${styles.connectionLine} ${styles.connectionLineAnimated} ${styles.visible}`}
              style={{
                stroke: 'rgba(0, 255, 157, 0.3)'
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ConnectionLines;
