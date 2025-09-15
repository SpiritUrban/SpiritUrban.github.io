import React, { useRef, useEffect, useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import styles from './Minimap.module.css';

interface MinimapProps {
  contentRef: React.RefObject<HTMLElement>;
  viewportRef?: React.RefObject<HTMLElement>;
  width?: number;
  height?: number;
  className?: string;
}

const Minimap: React.FC<MinimapProps> = ({
  contentRef,
  viewportRef,
  width = 200,
  height = 400,
  className = ''
}) => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Capture entire page thumbnail with optimized visibility handling
  const captureThumbnail = useCallback(async () => {
    // Use document.documentElement to capture the entire page
    const targetElement = document.documentElement;
    const minimapElement = minimapRef.current;
    if (!minimapElement) return;
    
    // Only adjust opacity if not already hidden
    const wasHidden = minimapElement.classList.contains(styles['hidden']);
    if (!wasHidden) {
      minimapElement.style.opacity = '0.5';
    }
    
    try {
      const dataUrl = await toPng(targetElement, {
        width: targetElement.offsetWidth,
        height: targetElement.scrollHeight,
        skipFonts: true,
        pixelRatio: 0.5, // Lower resolution for better performance
        cacheBust: true,
        backgroundColor: 'transparent',
        quality: 0.7, // Slightly lower quality for better performance
        skipAutoScale: true
      });
      
      // Only update if the data URL is different to prevent unnecessary re-renders
      setThumbnail(prev => prev === dataUrl ? prev : dataUrl);
    } catch (error) {
      console.error('Error capturing thumbnail:', error);
      // Keep the existing thumbnail on error
    } finally {
      if (!wasHidden) {
        minimapElement.style.opacity = '1';
      }
    }
  }, [contentRef]);

  // Update thumbnail when content changes
  useEffect(() => {
    if (!contentRef.current) return;
    
    const observer = new MutationObserver(() => {
      captureThumbnail();
    });
    
    // Initial capture
    captureThumbnail();
    
    // Observe content changes
    observer.observe(contentRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
    
    // Cleanup
    return () => observer.disconnect();
  }, [contentRef, captureThumbnail]);

  // Handle scroll updates
  const updateScrollPosition = useCallback(() => {
    if (!contentRef.current || !minimapRef.current) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    const ratio = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
    
    const indicator = minimapRef.current.querySelector(`.${styles['minimap-indicator']}`) as HTMLElement;
    if (indicator) {
      const indicatorHeightValue = (viewportHeight / scrollHeight) * 100;
      const maxPosition = 100 - indicatorHeightValue;
      const position = ratio * maxPosition;
      
      indicator.style.setProperty('--indicator-top', `${position}%`);
      indicator.style.setProperty('--indicator-height', `${indicatorHeightValue}%`);
    }
    
    setScrollPosition(ratio * 100);
  }, [contentRef, viewportRef]);

  // Set up scroll and resize listeners with optimized screenshot updates
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    window.scrollY; // Track last scroll position
    let lastCaptureTime = 0;
    const minCaptureInterval = 2000; // Increased minimum time between captures
    
    const handleScroll = () => {
      // Always update scroll position for smooth indicator movement
      updateScrollPosition();
      
      // Clear any pending screenshot updates
      clearTimeout(scrollTimeout);
      
      // Only update screenshot after scrolling has stopped
      scrollTimeout = setTimeout(() => {
        const currentTime = Date.now();
        const timeSinceLastCapture = currentTime - lastCaptureTime;
        
        // Only capture if enough time has passed since last capture
        if (timeSinceLastCapture > minCaptureInterval) {
          lastCaptureTime = currentTime;
          captureThumbnail();
        }
      }, 500); // Increased debounce time for smoother experience
    };
    
    // Use requestAnimationFrame to batch scroll events
    let ticking = false;
    const handleScrollRAF = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScrollRAF, { passive: true });
    window.addEventListener('resize', updateScrollPosition);
    
    // Initial update
    updateScrollPosition();
    
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScrollRAF);
      window.removeEventListener('resize', updateScrollPosition);
    };
  }, [updateScrollPosition, captureThumbnail]);

  // Handle minimap click/drag with edge detection
  const handleMinimapInteraction = useCallback((e: React.MouseEvent) => {
    if (!minimapRef.current || !contentRef.current) return;
    
    const rect = minimapRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    
    // Define edge threshold (10% from top and bottom)
    const edgeThreshold = height * 0.1;
    let ratio = y / height;
    
    // Check if near edges
    const nearTop = y < edgeThreshold;
    const nearBottom = y > height - edgeThreshold;
    
    // Adjust ratio if near edges
    if (nearTop) {
      ratio = 0; // Snap to top
    } else if (nearBottom) {
      ratio = 1; // Snap to bottom
    } else {
      // Normalize ratio to exclude edge threshold areas
      ratio = (y - edgeThreshold) / (height - edgeThreshold * 2);
      ratio = Math.min(Math.max(ratio, 0), 1);
    }
    
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    let newScrollTop = ratio * maxScroll;
    
    // Add a small offset to ensure we reach the very top/bottom
    if (nearTop) newScrollTop = 0;
    if (nearBottom) newScrollTop = maxScroll;

    window.scrollTo({
      top: newScrollTop,
      behavior: 'smooth',
    });
  }, [contentRef, viewportRef]);

  return (
    <div 
      ref={minimapRef}
      className={`${styles['minimap-container']} ${className}`}
      style={{
        '--minimap-width': `${width}px`,
        '--minimap-height': `${height}px`,
        '--minimap-thumbnail-bg': thumbnail ? `url(${thumbnail})` : 'none'
      } as React.CSSProperties}
      role="region"
      aria-label="Page navigation"
    >
      <div className={styles['minimap-thumbnail']}>
        <div 
          className={styles['minimap-interaction-layer']}
          onClick={handleMinimapInteraction}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMinimapInteraction(e);
          }}
          onMouseMove={(e) => {
            if (isDragging) handleMinimapInteraction(e);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(scrollPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`Scrolled to ${Math.round(scrollPosition)}% of the page`}
          aria-orientation="vertical"
          aria-label="Document scroll position"
        />
        <div 
          className={styles['minimap-indicator']}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Minimap;
