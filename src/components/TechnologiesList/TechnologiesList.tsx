import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUniqueTechnologies } from '../../features/timeline/timelineSelectors';
import { TechIcons } from '../../utils/techIcons';
import ConnectionLines from './ConnectionLines';
import styles from './TechnologiesList.module.css';

const TechnologiesList: React.FC = () => {
  const technologies = useAppSelector(selectUniqueTechnologies);

  // Ховер — единственный стейт
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Контейнер (для делегирования событий и для ConnectionLines)
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Стабильные refs по имени технологии (а не по индексу):
   * сохраняются между рендерами и не ломаются при перестановках/фильтрах.
   */
  const refsByTech = useRef<Record<string, { current: HTMLDivElement | null }>>({});

  // Генерим массив refs в порядке текущего technologies, но с устойчивыми объектами
  const itemRefs = useMemo(
    () =>
      technologies.map((tech) => {
        if (!refsByTech.current[tech]) {
          refsByTech.current[tech] = { current: null };
        }
        return refsByTech.current[tech];
      }),
    [technologies]
  );

  // Делегируем hover на контейнер: меньше обработчиков и GC-нагрузки
  const handleMouseOver = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const item = target.closest(`.${styles.techItem}`) as HTMLDivElement | null;
    const name = item?.dataset?.techName || null;
    if (name !== hoveredTech) setHoveredTech(name);
  }, [hoveredTech]);

  const handleMouseOut = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as HTMLElement | null;
    const leftToItem = related?.closest?.(`.${styles.techItem}`);
    // Если ушли за пределы списка или не над .techItem — сбрасываем
    if (!leftToItem) setHoveredTech(null);
  }, []);

  return (
    <>
      {/* Больше НЕ ремоунтим на каждый hover */}
      <ConnectionLines
        itemRefs={itemRefs}
        containerRef={containerRef}
        hoveredTech={hoveredTech}
      />

      <div
        ref={containerRef}
        className={styles.technologiesContainer}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <h3 className={styles.title}>Technologies</h3>

        <div className={styles.technologiesList}>
          {technologies.map((tech) => (
            <div
              key={tech}
              ref={(el) => {
                // Прямо присваиваем в устойчивый ref-объект по ключу
                if (!refsByTech.current[tech]) {
                  refsByTech.current[tech] = { current: el };
                } else {
                  refsByTech.current[tech].current = el;
                }
              }}
              className={`${styles.techItem} ${hoveredTech === tech ? styles.techItemHovered : ''}`}
              data-tech-name={tech}
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
