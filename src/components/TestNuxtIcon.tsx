import { TechIcon } from '../utils/techIcons';
import styles from './TestNuxtIcon.module.css';

const TestNuxtIcon = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nuxt.js Icon Test</h2>
      <div className={styles.iconRow}>
        <TechIcon name="nuxt" />
        <span className={styles.label}>Nuxt.js</span>
      </div>
      <div className={styles.iconRow}>
        <TechIcon name="nuxt.js" />
        <span className={styles.label}>Nuxt.js (with dot)</span>
      </div>
      <div className={styles.iconRow}>
        <TechIcon name="nuxtjs" />
        <span className={styles.label}>Nuxt.js (no dot)</span>
      </div>
    </div>
  );
};

export default TestNuxtIcon;
