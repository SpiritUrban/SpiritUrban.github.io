import React, { useEffect, useRef, useState } from 'react';
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

const Timeline: React.FC = () => {
  const experiences = workExperience as WorkExperience[];
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Функция для логирования видимых элементов
  const logVisibleItems = () => {
    if (!timelineRef.current) return;
    
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    const items = Array.from(timelineRef.current.querySelectorAll(`.${styles.timelineItem}`));
    const visibleItems = items.map((item, index) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top <= viewportHeight * 0.9 &&
                      rect.bottom >= viewportHeight * 0.1;
      
      if (isVisible) {
        const title = item.querySelector(`.${styles.timelineTitle}`)?.textContent || 'No title';
        const year = item.querySelector(`.${styles.timelineYear}`)?.textContent || 'No year';
        
        // Рассчитываем процент видимости элемента
        const visibleHeight = Math.min(rect.bottom, viewportHeight * 0.9) - 
                            Math.max(rect.top, viewportHeight * 0.1);
        const visibilityPercentage = Math.round((visibleHeight / rect.height) * 100);
        
        return {
          index,
          title: title.trim(),
          year: year.trim(),
          visibility: `${visibilityPercentage}%`,
          screenPosition: {
            // Координаты относительно окна просмотра
            viewport: {
              top: Math.round(rect.top),
              right: Math.round(rect.right),
              bottom: Math.round(rect.bottom),
              left: Math.round(rect.left),
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            },
            // Процентное положение на экране
            percentage: {
              fromTop: Math.round((rect.top / viewportHeight) * 100) + '%',
              fromLeft: Math.round((rect.left / viewportWidth) * 100) + '%',
              visibleHeight: visibilityPercentage + '%'
            },
            // Абсолютные координаты (если нужно)
            absolute: {
              top: Math.round(rect.top + window.scrollY),
              left: Math.round(rect.left + window.scrollX)
            }
          },
          viewport: {
            width: viewportWidth,
            height: viewportHeight,
            scrollY: window.scrollY,
            scrollX: window.scrollX
          }
        };
      }
      return null;
    }).filter(Boolean);

    console.log('Visible timeline items:', {
      timestamp: new Date().toISOString(),
      viewport: {
        width: viewportWidth,
        height: viewportHeight,
        scrollY: window.scrollY,
        scrollX: window.scrollX
      },
      items: visibleItems
    });
  };

  // Эффект для логирования при монтировании и скролле
  useEffect(() => {
    if (isFirstRender.current) {
      console.log('Timeline mounted');
      isFirstRender.current = false;
    }

    // Первый вызов при монтировании
    logVisibleItems();

    // Обработчик скролла
    const handleScroll = () => {
      logVisibleItems();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setVisibleItems((prev) => [...new Set([...prev, index])]);
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
        return (
          <div 
            key={index} 
            className={`${styles.timelineItem} ${visibleItems.includes(index) ? styles.visible : ''} ${isExpanded ? styles.expanded : ''}`}
            onClick={() => toggleExpand(index)}
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
