import React, { useRef, useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUniqueTechnologies } from '../../features/timeline/timelineSelectors';
import { TechIcons } from '../../utils/techIcons';
import ConnectionLines from './ConnectionLines';
import styles from './TechnologiesList.module.css';

const TechnologiesList: React.FC = () => {
  const technologies = useAppSelector(selectUniqueTechnologies);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  
  // Debug hover state changes
  useEffect(() => {
    console.log('Hovered tech changed:', hoveredTech);
  }, [hoveredTech]);

  // Initialize refs array
  if (itemRefs.current.length !== technologies.length) {
    itemRefs.current = Array(technologies.length).fill(null);
  }

  // Create a stable array of refs for ConnectionLines
  const stableRefs = technologies.map((_, i) => ({
    current: itemRefs.current[i]
  }));

  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <>
      <ConnectionLines 
        itemRefs={stableRefs} 
        containerRef={containerRef} 
        hoveredTech={hoveredTech}
        key={hoveredTech} // Force re-render when hover changes
      />
      <div ref={containerRef} className={styles.technologiesContainer}>
        <h3 className={styles.title}>Technologies</h3>
        <div className={styles.technologiesList}>
          {technologies.map((tech, index) => (
            <div 
              key={tech} 
              ref={el => {
                if (el) {
                  itemRefs.current[index] = el;
                }
              }}
              className={`${styles.techItem} ${hoveredTech === tech ? styles.techItemHovered : ''}`}
              data-tech-name={tech}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className={styles.techIconWrapper}>
                <TechIcons techs={[tech]} iconClassName={styles.techIcon} />
              </div>
              <span className={styles.techName}>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TechnologiesList;
