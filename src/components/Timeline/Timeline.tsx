import React, { useEffect, useRef, useState } from 'react';
import styles from './Timeline.module.css';
import workExperience from '../../assets/data/work-experience.json';

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
                {exp.technologies.split(',').map((tech, i) => (
                  <span key={i} className={styles.techTag}>{tech.trim()}</span>
                ))}
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
