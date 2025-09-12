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
  const timelineRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={timelineRef} className={styles.timeline}>
      {experiences.map((exp, index) => (
        <div 
          key={index} 
          className={`${styles.timelineItem} ${visibleItems.includes(index) ? styles.visible : ''}`}
        >
          <div className={styles.timelineDot}></div>
          <div className={styles.timelineContent}>
            <div className={styles.timelineYear}>{exp.years}</div>
            <h3 className={styles.timelineTitle}>
              {exp.title} at{' '}
              {exp.companySite ? (
                <a 
                  href={exp.companySite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.companyLink}
                >
                  {exp.company}
                </a>
              ) : (
                <span>{exp.company}</span>
              )}
            </h3>
            <p className={styles.timelineDescription}>
              <strong>About company:</strong> {exp.aboutCompany}
            </p>
            <p className={styles.timelineTech}>
              <strong>Technologies:</strong> {exp.technologies}
            </p>
            <p className={styles.timelineProduct}>
              <strong>Product:</strong> {exp.product}
            </p>
            <p className={styles.timelineAbout}>
              <strong>About:</strong> {exp.aboutProduct}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
