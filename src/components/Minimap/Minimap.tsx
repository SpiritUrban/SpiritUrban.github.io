import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { toPng } from 'html-to-image';
import styles from './Minimap.module.css';

// Extended HTML attributes for slider role
interface SliderHTMLAttributes<T> extends React.AriaAttributes, React.HTMLAttributes<T> {
  role?: 'slider';
  'aria-valuenow': number;
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-valuetext'?: string;
  'aria-orientation'?: 'vertical' | 'horizontal';
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

interface MinimapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof SliderHTMLAttributes<HTMLDivElement>> {
  contentRef: React.RefObject<HTMLElement | null>;
  viewportRef?: React.RefObject<HTMLElement | null>;
  width?: number;
  height?: number;
}

const Minimap: React.FC<MinimapProps> = ({
  contentRef,
  viewportRef,
  width = 200,
  height = 400,
  ...restProps
}) => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Memoize the indicator height calculation
  const indicatorHeight = useMemo(() => {
    if (!contentRef.current) return '20%';
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const heightRatio = (viewportHeight / scrollHeight) * 100;
    return `${Math.max(heightRatio, 5)}%`;
  }, [contentRef, viewportRef]);
  
  // Handle minimap click/drag
  const handleMinimapInteraction = useCallback((e: React.MouseEvent) => {
    if (!minimapRef.current || !contentRef.current) return;
    
    const rect = minimapRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const ratio = Math.min(Math.max(y / rect.height, 0), 1);
    
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    const newScrollTop = ratio * maxScroll;

    window.scrollTo({
      top: newScrollTop,
      behavior: 'smooth',
    });
  }, [contentRef, viewportRef]);
  
  // Update scroll position indicator
  const updateScrollPosition = useCallback(() => {
    if (!contentRef.current) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const viewportHeight = viewportRef?.current?.clientHeight || window.innerHeight;
    const maxScroll = Math.max(1, scrollHeight - viewportHeight);
    const ratio = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;
    
    setScrollPosition(ratio * 100);
  }, [contentRef, viewportRef]);
  
  // Set up scroll and resize listeners
  useEffect(() => {
    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    window.addEventListener('resize', updateScrollPosition);
    
    // Initial update
    updateScrollPosition();
    
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', updateScrollPosition);
    };
  }, [updateScrollPosition]);
  
  // Capture page thumbnail
  const captureThumbnail = useCallback(async () => {
    if (!contentRef.current) return;
    
    // Add loading class to the minimap
    const minimapElement = minimapRef.current;
    if (minimapElement) {
      minimapElement.classList.add(styles['hidden']);
    }
    
    try {
      // Generate the thumbnail with html-to-image
      const dataUrl = await toPng(contentRef.current, {
        width: width * 2,
        height: contentRef.current.scrollHeight * (width / contentRef.current.offsetWidth),
        skipFonts: true,
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: 'white',
        style: {
          transform: `scale(${width / contentRef.current.offsetWidth})`,
          transformOrigin: 'top left',
          width: `${contentRef.current.offsetWidth}px`,
          height: 'auto'
        }
      });
      
      setThumbnail(dataUrl);
    } catch (error) {
      console.error('Error capturing thumbnail:', error);
      setThumbnail('');
    } finally {
      // Always remove the loading class, even if there was an error
      if (minimapElement) {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          minimapElement.classList.remove(styles['hidden']);
        }, 100);
      }
    }
  }, [contentRef, width]);
  
  // Update thumbnail when content changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      captureThumbnail();
    });

    if (contentRef.current) {
      captureThumbnail();
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    }

    return () => observer.disconnect();
  }, [captureThumbnail, contentRef]);
  
  // Calculate ARIA values for the slider
  const sliderAriaProps: SliderHTMLAttributes<HTMLDivElement> = {
    'aria-valuenow': Math.round(scrollPosition),
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuetext': `Scrolled to ${Math.round(scrollPosition)}% of the page`,
    'aria-orientation': 'vertical',
    'aria-label': 'Document scroll position',
    'aria-labelledby': 'minimap-label',
    role: 'slider',
    tabIndex: 0
  };
  
  // Calculate indicator position
  const indicatorTop = `calc(${scrollPosition}% - ${parseFloat(indicatorHeight) / 2}%)`;
  
  // Update CSS custom properties for the minimap
  useEffect(() => {
    if (!minimapRef.current) return;
    
    const container = minimapRef.current;
    container.style.setProperty('--indicator-top', indicatorTop);
    container.style.setProperty('--indicator-height', indicatorHeight);
    container.style.setProperty('--minimap-width', `${width}px`);
    container.style.setProperty('--minimap-height', `${height}px`);
    container.style.setProperty('--minimap-thumbnail-bg', thumbnail ? `url(${thumbnail})` : 'none');
    
    return () => {
      container.style.removeProperty('--indicator-top');
      container.style.removeProperty('--indicator-height');
      container.style.removeProperty('--minimap-width');
      container.style.removeProperty('--minimap-height');
      container.style.removeProperty('--minimap-thumbnail-bg');
    };
  }, [indicatorTop, indicatorHeight, width, height, thumbnail]);
  
  return (
    <div 
      ref={minimapRef}
      className={`${styles['minimap-container']} ${
        width !== 200 ? styles['has-custom-width'] : ''
      } ${
        height !== 400 ? styles['has-custom-height'] : ''
      }`}
      role="region"
      aria-label="Page navigation"
      {...restProps}
    >
      <div className={styles['minimap-thumbnail']}>
        <SliderElement
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
          {...sliderAriaProps}
          data-testid="minimap-thumbnail"
        />
        <div 
          className={styles['minimap-indicator']}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

// Slider element with proper ARIA attributes for the slider role
interface SliderElementProps extends SliderHTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
}

const SliderElement = React.forwardRef<HTMLDivElement, SliderElementProps>(({
  'aria-valuenow': ariaValueNow,
  'aria-valuemin': ariaValueMin,
  'aria-valuemax': ariaValueMax,
  'aria-valuetext': ariaValueText,
  'aria-orientation': ariaOrientation = 'vertical',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  ...props
}, ref) => {
  const sliderProps: SliderHTMLAttributes<HTMLDivElement> = {
    ...props,
    role: 'slider',
    'aria-valuenow': Number(ariaValueNow),
    'aria-valuemin': Number(ariaValueMin),
    'aria-valuemax': Number(ariaValueMax),
    'aria-valuetext': ariaValueText,
    'aria-orientation': ariaOrientation,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className: [styles['minimap-interaction-layer'], className].filter(Boolean).join(' '),
    tabIndex: 0
  };

  return <div ref={ref} {...sliderProps} />;
});

export default Minimap;
