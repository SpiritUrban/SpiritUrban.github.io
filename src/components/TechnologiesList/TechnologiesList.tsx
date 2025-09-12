import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUniqueTechnologies } from '../../features/timeline/timelineSelectors';
import styles from './TechnologiesList.module.css';

const TechnologiesList: React.FC = () => {
  const technologies = useAppSelector(selectUniqueTechnologies);

  // Function to get the icon class based on technology name
  const getIconClass = (techName: string): string => {
    const techIcons: { [key: string]: string } = {
      'react': 'devicon-react-original',
      'typescript': 'devicon-typescript-plain',
      'javascript': 'devicon-javascript-plain',
      'nodejs': 'devicon-nodejs-plain',
      'python': 'devicon-python-plain',
      'html': 'devicon-html5-plain',
      'css': 'devicon-css3-plain',
      'sass': 'devicon-sass-original',
      'redux': 'devicon-redux-original',
      'git': 'devicon-git-plain',
      'github': 'devicon-github-original',
      'docker': 'devicon-docker-plain',
      'aws': 'devicon-amazonwebservices-original',
      'azure': 'devicon-azure-plain',
      'firebase': 'devicon-firebase-plain',
      'mongodb': 'devicon-mongodb-plain',
      'postgresql': 'devicon-postgresql-plain',
      'graphql': 'devicon-graphql-plain',
      'jest': 'devicon-jest-plain',
      'webpack': 'devicon-webpack-plain',
      'babel': 'devicon-babel-plain',
      'linux': 'devicon-linux-plain',
      'windows': 'devicon-windows8-original',
      'apple': 'devicon-apple-original',
      'android': 'devicon-android-plain',
      'java': 'devicon-java-plain',
      'cplusplus': 'devicon-cplusplus-plain',
      'csharp': 'devicon-csharp-plain',
    };

    const normalizedTechName = techName.toLowerCase();
    return techIcons[normalizedTechName] || 'devicon-code-plain';
  };

  return (
    <div className={styles.technologiesContainer}>
      <h3 className={styles.title}>Technologies</h3>
      <div className={styles.technologiesList}>
        {technologies.map((tech, index) => (
          <div key={index} className={styles.techItem}>
            <i className={`${getIconClass(tech)} ${styles.techIcon}`}></i>
            <span className={styles.techName}>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologiesList;
