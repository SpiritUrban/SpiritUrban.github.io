import { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setVisibleItems } from '../../features/timeline/timelineSlice';
import type { FC, JSX } from 'react';
import styles from './Timeline.module.css';
import workExperience from '../../assets/data/work-experience.json';
import { TechIcons } from '../../utils/techIcons';

interface WorkExperience {
  year: string;
  years: string;
  title: string;
  company: string;
  aboutCompany: string;
  companySite?: string;
  technologies: string;
  product: string;
  aboutProduct: string;
}

const Timeline: FC = (): JSX.Element => {
  const experiences = workExperience as WorkExperience[];
  const dispatch = useDispatch();
  const timelineRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const hasAutoScrolled = useRef(false);
  
  // Auto-scroll page on mount to ensure proper rendering
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || hasAutoScrolled.current) return;

    const autoScroll = async () => {
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

        // Save current scroll position
        const startScroll = window.scrollY;
        const scrollAmount = 200; // Increased scroll amount for page scroll

        // Scroll down and back up to trigger rendering
        window.scrollTo({ top: startScroll + scrollAmount, behavior: 'smooth' });

        // Scroll back after a delay
        setTimeout(() => {
          window.scrollTo({ top: startScroll, behavior: 'smooth' });
          hasAutoScrolled.current = true;
        }, 800); // Increased delay for page scroll
      } catch (error) {
        console.error('Error during auto-scroll:', error);
      }
    };

    autoScroll();
  }, []);

  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  
  const toggleExpand = useCallback((index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  }, []);

  // Функция для получения координат элемента
  const getElementPosition = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return {
      viewport: {
        top: Math.round(rect.top),
        right: Math.round(rect.right),
        bottom: Math.round(rect.bottom),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      absolute: {
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left + window.scrollX)
      }
    };
  };


  // Функция для обновления видимых элементов
  const updateVisibleItems = useCallback(() => {
    if (!timelineRef.current) return;
    
    const viewportHeight = window.innerHeight;
    const items = Array.from(timelineRef.current.querySelectorAll(`.${styles.timelineItem}`));
    
    // Определяем тип для видимого элемента
    type VisibleItem = {
      index: number;
      title: string;
      year: string;
      company: string;
      visibility: string;
      screenPosition: {
        viewport: {
          top: number;
          right: number;
          bottom: number;
          left: number;
          width: number;
          height: number;
        };
        absolute: {
          top: number;
          left: number;
        };
        percentage: {
          fromTop: string;
          fromLeft: string;
          visibleHeight: string;
        };
      };
      technologies: Array<{ 
        name: string; 
        position: {
          viewport: {
            top: number;
            right: number;
            bottom: number;
            left: number;
            width: number;
            height: number;
          };
          absolute: {
            top: number;
            left: number;
          };
        } 
      }>;
      viewport: {
        width: number;
        height: number;
        scrollY: number;
        scrollX: number;
      };
    };
    
    const visibleItems: VisibleItem[] = items.map((item, index) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top <= viewportHeight * 0.9 && rect.bottom >= viewportHeight * 0.1;
      
      if (!isVisible) return null;
      
      const title = item.querySelector(`.${styles.timelineTitle}`)?.textContent || 'No title';
      const year = item.querySelector(`.${styles.timelineYear}`)?.textContent || 'No year';
      
      // Get technologies from work experience data
      const experience = experiences[experiences.length - 1 - index];
      const techNames = experience?.technologies
        ? experience.technologies.split(',').map(t => t.trim())
        : [];
        
      // Get positions from DOM elements
      const techElements = Array.from(item.querySelectorAll(`.${styles.techIcon}`));
      const technologies = techNames.map((name, i) => ({
        name: name || 'Unknown',
        position: techElements[i] ? getElementPosition(techElements[i]) : {
          viewport: { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 },
          absolute: { top: 0, left: 0 }
        }
      }));
      
      const visibleHeight = Math.min(rect.bottom, viewportHeight * 0.9) - 
                          Math.max(rect.top, viewportHeight * 0.1);
      const visibilityPercentage = Math.round((visibleHeight / rect.height) * 100);
      
      return {
        index,
        title: title.trim(),
        year: year.trim(),
        company: experiences[experiences.length - 1 - index]?.company || 'Unknown Company',
        visibility: `${visibilityPercentage}%`,
        screenPosition: {
          ...getElementPosition(item),
          percentage: {
            fromTop: `${Math.round((rect.top / viewportHeight) * 100)}%`,
            fromLeft: '50%',
            visibleHeight: `${visibilityPercentage}%`
          }
        },
        technologies,
        viewport: {
          width: window.innerWidth,
          height: viewportHeight,
          scrollY: window.scrollY,
          scrollX: window.scrollX
        }
      };
    }).filter((item): item is VisibleItem => item !== null);
    
    dispatch(setVisibleItems(visibleItems));
  }, [dispatch]);

  // Track visible items with IntersectionObserver
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);

  // Effect for updating visible items on mount and scroll
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    // Initial update
    updateVisibleItems();

    // Throttle scroll events
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateVisibleItems();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateVisibleItems);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateVisibleItems);
    };
  }, [updateVisibleItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setVisibleIndices(prev => [...new Set([...prev, index])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const items = timelineRef.current?.querySelectorAll(`.${styles.timelineItem}`);
    items?.forEach((item, index) => {
      item.setAttribute('data-index', index.toString());
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  // Create a reversed copy of the experiences array
  const reversedExperiences = [...experiences].reverse();

  return (
    <div ref={timelineRef} className={styles.timeline}>
      {reversedExperiences.map((exp, index) => {
        const isExpanded = expandedItems.includes(index);
        const originalIndex = experiences.length - 1 - index; // Get original index before reverse
        return (
          <div 
            key={index} 
            className={`${styles.timelineItem} ${visibleIndices.includes(index) ? styles.visible : ''} ${isExpanded ? styles.expanded : ''}`}
            onClick={() => toggleExpand(index)}
            data-card-index={originalIndex}
            data-card-technologies={exp.technologies}
          >
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <div className={styles.timelineYear}>{exp.years}</div>
              <h3 className={styles.timelineTitle}>
                {exp.title} at {exp.company}
              </h3>
              
              <div className={styles.technologies}>
                <TechIcons 
                  techs={exp.technologies} 
                  className={styles.techIconsContainer}
                  iconClassName={styles.techIcon}
                />
              </div>
              
              {isExpanded && (
                <div className={styles.expandedContent}>
                  {exp.companySite && (
                    <a 
                      href={exp.companySite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.companyLink}
                      onClick={e => e.stopPropagation()}
                    >
                      Visit Company Website
                    </a>
                  )}
                  <p className={styles.timelineDescription}>
                    <strong>About company:</strong> {exp.aboutCompany}
                  </p>
                  <p className={styles.timelineProduct}>
                    <strong>Product:</strong> {exp.product}
                  </p>
                  <p className={styles.timelineAbout}>
                    <strong>About:</strong> {exp.aboutProduct}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
