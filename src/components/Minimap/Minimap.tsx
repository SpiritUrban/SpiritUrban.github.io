import React, { useRef, useEffect, useState, useCallback } from 'react';
import './Minimap.css';

// Custom interface for slider props
interface SliderProps {
  'aria-valuenow': number;
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-valuetext'?: string;
  'aria-orientation'?: 'vertical' | 'horizontal';
  'aria-label'?: string;
  [key: string]: any; // Allow other props
}

interface MinimapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof SliderProps>, SliderProps {
  contentRef: React.RefObject<HTMLElement | null>;
  viewportRef?: React.RefObject<HTMLElement | null>;
  width?: number;
  height?: number;
}

const Minimap: React.FC<MinimapProps> = ({
  contentRef,
  viewportRef,
  width = 150,
  height = 300,
}) => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [indicatorPosition, setIndicatorPosition] = useState({ 
    top: '0%', 
    height: '20%' 
  });
  const [isDragging, setIsDragging] = useState(false);
  // Used to store the current scroll position for accessibility
  const [scrollPosition, setScrollPosition] = useState(0);

  // Update indicator position based on scroll
  const updateIndicatorPosition = useCallback(() => {
    // Get the current scroll position from the window
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    
    // Get the maximum scrollable height
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight
    );
    
    const viewportHeight = window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    const ratio = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
    
    const indicatorHeight = Math.max((viewportHeight / scrollHeight) * 100, 5);
    const indicatorTop = Math.max(0, Math.min(ratio * (100 - indicatorHeight), 100 - indicatorHeight));
    
    // Update scroll position for accessibility
    const newScrollPosition = Math.round(ratio * 100);
    setScrollPosition(newScrollPosition);
    
    // Update CSS variables directly on the container
    if (minimapRef.current) {
      minimapRef.current.style.setProperty('--indicator-top', `${indicatorTop}%`);
      minimapRef.current.style.setProperty('--indicator-height', `${indicatorHeight}%`);
    }
    
    setIndicatorPosition({
      top: `${indicatorTop}%`,
      height: `${indicatorHeight}%`
    });
  }, []);

  // Handle minimap click/drag
  const handleMinimapInteraction = useCallback((e: React.MouseEvent) => {
    if (!minimapRef.current) return;
    
    const rect = minimapRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const ratio = Math.min(Math.max(y / rect.height, 0), 1);
    
    // Get the maximum scrollable height
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight
    );
    
    const viewportHeight = window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    const newScrollTop = ratio * maxScroll;
    
    // Scroll the window to the new position
    window.scrollTo({
      top: newScrollTop,
      behavior: 'smooth',
    });
    
    // Force update the indicator position
    requestAnimationFrame(() => {
      updateIndicatorPosition();
    });
  }, [contentRef, viewportRef]);

  // Set up scroll and resize listeners with requestAnimationFrame for smoother updates
  useEffect(() => {
    let animationFrameId: number;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          updateIndicatorPosition();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    const handleResize = () => {
      if (!ticking) {
        animationFrameId = requestAnimationFrame(() => {
          updateIndicatorPosition();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Add event listeners to the window
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Also add scroll listener to the content element if it's different from the document
    const contentElement = contentRef.current;
    if (contentElement && contentElement !== document.documentElement && contentElement !== document.body) {
      contentElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initial calculation
    updateIndicatorPosition();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      // Clean up content element listener if it was added
      if (contentElement && contentElement !== document.documentElement && contentElement !== document.body) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [updateIndicatorPosition, contentRef]);

  // Calculate container class names
  const containerClasses = [
    'minimap-container',
    width !== 150 ? 'has-custom-width' : '',
    height !== 300 ? 'has-custom-height' : ''
  ].filter(Boolean).join(' ');

  // Calculate indicator classes
  const indicatorClasses = 'viewport-indicator active';
  
  // Set indicator position classes
  const indicatorPositionClass = `pos-${Math.round(parseFloat(indicatorPosition.top))}`;
  const indicatorHeightClass = `h-${Math.round(parseFloat(indicatorPosition.height))}`;
  // Set container style with width and height
  useEffect(() => {
    if (minimapRef.current) {
      minimapRef.current.style.setProperty('--minimap-width', `${width}px`);
      minimapRef.current.style.setProperty('--minimap-height', `${height}px`);
    }
  }, [width, height]);

  // Calculate the current scroll position as a string
  const currentScrollPosition = Math.round(scrollPosition).toString();

  return (
    <div 
      ref={minimapRef}
      className={containerClasses}
      role="region"
      aria-label="Page navigation"
    >
      <div 
        className="minimap"
        onClick={handleMinimapInteraction}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMinimapInteraction(e);
        }}
        onMouseMove={(e) => {
          if (isDragging) {
            handleMinimapInteraction(e);
          }
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        role="slider"
        tabIndex={0}
        aria-valuenow={currentScrollPosition as any}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuetext={`${currentScrollPosition}% scrolled`}
        aria-orientation="vertical"
        aria-label="Document scroll position"
      >
        <div 
          className={`${indicatorClasses} ${indicatorPositionClass} ${indicatorHeightClass}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Minimap;
