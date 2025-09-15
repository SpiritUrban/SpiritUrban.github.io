import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectVisibleItems } from '../../features/timeline/timelineSelectors';
import styles from './TechnologiesList.module.css';


// TimelineItem interface removed as it's not used
interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLElement | null>;
  timelineRef?: React.RefObject<HTMLElement | null>;
  hoveredTech: string | null;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs, timelineRef, hoveredTech }) => {
  console.group('ConnectionLines - Initial Render');
  console.log('Item Refs:', itemRefs);
  console.log('Timeline Ref:', timelineRef?.current);
  console.log('Hovered Tech:', hoveredTech);
  console.groupEnd();
  const [_, setForceUpdate] = useState(0);
  const rafId = useRef<number | null>(null);
  const monitorInterval = useRef<NodeJS.Timeout | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isMounted = useRef(true);
  
  // Memoize the update function to prevent unnecessary re-renders
  const updateLines = useCallback((): void => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame((): void => {
      if (isMounted.current) {
        setForceUpdate(prev => prev + 1);
      }
    });
  }, []);
  

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
    const checkAndFixMissingPaths = (_isInitial = false) => {
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
    console.group(`getCardPositions for "${techName}"`);
    const cards: CardPosition[] = [];
    
    try {
      // Find all cards that have this technology in their data-card-technologies attribute
      const selector = `[data-card-technologies*="${techName}"]`;
      console.log('Using selector:', selector);
      
      const cardElements = document.querySelectorAll(selector);
      console.log(`Found ${cardElements.length} cards for "${techName}"`);
      
      cardElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const cardPos = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          visible: true
        };
        console.log(`Card ${index + 1} position:`, cardPos, 'Rect:', rect);
        cards.push(cardPos);
      });
      
      return cards;
    } catch (error) {
      console.error('Error getting card positions:', error);
      return [];
    }
  }, [visibleCards]);

  // Define types for connection lines
  interface ConnectionLine {
    id: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    visible: boolean;
    isHighlighted?: boolean;
  }

  // Get all connection lines to render
  const getConnectionLines = useCallback((): ConnectionLine[] => {
    console.group('getConnectionLines');
    
    if (!itemRefs.length) {
      console.log('No item refs available, returning empty lines');
      console.groupEnd();
      return [];
    }
    
    console.log(`Processing ${itemRefs.length} tech items`);
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
    
    // Check if we should highlight lines for the current hovered tech
    const shouldHighlight = (techName: string): boolean => {
      return hoveredTech === techName;
    };
    
    console.group('Processing itemRefs');
    itemRefs.forEach((ref, index) => {
      console.group(`Item ${index}`);
      
      if (!ref.current) {
        console.log('Skipping - ref.current is null');
        console.groupEnd();
        return;
      }
      
      const techName = ref.current.getAttribute('data-tech-name');
      console.log('Tech name from data attribute:', techName);
      
      if (!techName) {
        console.log('Skipping - no tech name found');
        console.groupEnd();
        return;
      }
      
      const techRect = ref.current.getBoundingClientRect();
      console.log('Tech element rect:', {
        top: techRect.top,
        right: techRect.right,
        bottom: techRect.bottom,
        left: techRect.left,
        width: techRect.width,
        height: techRect.height
      });
      
      // Start from the right side of the technology item
      const startX = techRect.right;
      // Keep the vertical center
      const startY = techRect.top + techRect.height / 2;
      
      console.log('Line start position (x, y):', startX, startY);
      
      // Get all cards that use this technology
      console.log('Getting card positions for:', techName);
      const cards = getCardPositions(techName);
      const isHighlighted = shouldHighlight(techName);
      
      console.log(`Found ${cards.length} cards for ${techName}`, {
        isHighlighted,
        cards: cards.map((c, i) => ({
          index: i,
          x: c.x,
          y: c.y,
          visible: c.visible
        }))
      });
      
      cards.forEach((card, cardIndex) => {
        console.group(`Card ${cardIndex}`);
        const startInView = isInViewport(startY);
        const endInView = isInViewport(card.y);
        const shouldDraw = startInView || endInView;
        
        console.log('Checking viewport visibility:', {
          startY,
          endY: card.y,
          startInView,
          endInView,
          shouldDraw
        });
        
        if (shouldDraw) {
          const lineId = `line-${index}-${cardIndex}-${techName}`;
          
          // Cap Y coordinates to viewport bounds
          const cappedStartY = capY(startY);
          const cappedEndY = capY(card.y);
          
          const line = {
            id: lineId,
            startX,
            startY: cappedStartY,
            endX: card.x,
            endY: cappedEndY,
            visible: true,
            isHighlighted
          };
          
          console.log('Adding line:', line);
          lines.push(line);
        } else {
          console.log('Skipping line - both points outside viewport');
        }
        console.groupEnd();
      });
      console.groupEnd(); // End card loop group
    });
    console.groupEnd(); // End itemRefs group
    
    console.log('Generated Lines:', lines);
    console.groupEnd();
    return lines;
  }, [itemRefs, getCardPositions, hoveredTech]);
  
  // Get connection lines with logging
  const connectionLines = (() => {
    console.group('Generating Connection Lines');
    try {
      const lines = getConnectionLines();
      console.log('Connection Lines Generated:', lines.length);
      return lines;
    } catch (error) {
      console.error('Error generating connection lines:', error);
      return [];
    } finally {
      console.groupEnd();
    }
  })();
  
  
  // Log when connection lines change
  useEffect(() => {
    console.log('Connection Lines Updated:', {
      count: connectionLines.length,
      hasHighlighted: connectionLines.some(line => line.isHighlighted),
      lines: connectionLines
    });
  }, [connectionLines]);

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
            return null;
          }
          
          const pathData = createCurvedPath(line.startX, line.startY, line.endX, line.endY);
          
          return (
            <path
              key={line.id || `line-${index}`}
              d={pathData}
              fill="none"
              className={`${styles.connectionLine} ${styles.connectionLineAnimated} ${styles.visible} ${line.isHighlighted ? styles.highlighted : ''}`}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ConnectionLines;
