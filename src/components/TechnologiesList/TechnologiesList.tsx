import React, { useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUniqueTechnologies } from '../../features/timeline/timelineSelectors';
import { TechIcons } from '../../utils/techIcons';
import ConnectionLines from './ConnectionLines';
import styles from './TechnologiesList.module.css';

const TechnologiesList: React.FC = () => {
  const technologies = useAppSelector(selectUniqueTechnologies);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a ref for each technology
  const itemRefs = useRef<Array<HTMLDivElement | null>>(technologies.map(() => null));
  
  // Log when refs are updated
  React.useEffect(() => {
    console.log('Item refs updated:', {
      count: itemRefs.current.filter(Boolean).length,
      total: technologies.length
    });
  }, [technologies.length]);
  
  // Create a stable array of refs for ConnectionLines
  const stableRefs = React.useMemo(() => {
    const refs = technologies.map((_, i) => ({
      current: itemRefs.current[i] || null
    }));
    
    console.log('Stable refs created:', {
      count: refs.length,
      hasNulls: refs.some(ref => ref.current === null)
    });
    
    return refs;
  }, [technologies]);
  
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
                if (el !== itemRefs.current[index]) {
                  console.log(`Ref updated for ${tech} at index ${index}`, el);
                  itemRefs.current[index] = el;
                  // Force update after ref is set to ensure ConnectionLines gets the latest refs
                  setHoveredTech(prev => prev);
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
