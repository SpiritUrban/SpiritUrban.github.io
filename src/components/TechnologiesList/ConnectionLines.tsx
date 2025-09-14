import React, { useRef, useEffect, useState, useCallback } from 'react';
import styles from './TechnologiesList.module.css';

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
        ref={svgRef}
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
              opacity: pos.visible ? 0.7 : 0,  // Increased opacity for brighter lines
              transition: 'opacity 0.3s ease',
              filter: 'drop-shadow(0 0 2px rgba(0, 255, 157, 0.5))'  // Subtle glow effect
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default ConnectionLines;
