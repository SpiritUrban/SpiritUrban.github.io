import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUniqueTechnologies } from '../../features/timeline/timelineSelectors';
import { TechIcons } from '../../utils/techIcons';
import styles from './TechnologiesList.module.css';

const TechnologiesList: React.FC = () => {
  const technologies = useAppSelector(selectUniqueTechnologies);

  return (
    <div className={styles.technologiesContainer}>
      <h3 className={styles.title}>Technologies</h3>
      <div className={styles.technologiesList}>
        {technologies.map((tech, index) => (
          <div key={index} className={styles.techItem}>
            <div className={styles.techIconWrapper}>
              <TechIcons techs={[tech]} iconClassName={styles.techIcon} />
            </div>
            <span className={styles.techName}>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologiesList;
