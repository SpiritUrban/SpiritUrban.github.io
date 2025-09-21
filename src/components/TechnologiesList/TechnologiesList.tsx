import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUniqueTechnologies } from '../../features/timeline/timelineSelectors';
import { TechIcons } from '../../utils/techIcons';
import ConnectionLines from './ConnectionLines';
import styles from './TechnologiesList.module.css';

const TechnologiesList: React.FC = () => {
  // Базовый набор из стора (может зависеть от видимых карточек)
  const technologies = useAppSelector(selectUniqueTechnologies);

  const [sortedTechnologies, setSortedTechnologies] = useState<string[]>([]);
  const [techConnections, setTechConnections] = useState<Record<string, number>>({});

  // Временный hover
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  // Единственная зафиксированная технология
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  /**
   * Подсчёт связей (ЛИНИЙ) по всему DOM:
   * — независимо от видимости карточек
   */
  useEffect(() => {
    const updateConnections = () => {
      const allCards = document.querySelectorAll('[data-card-technologies]');
      const connections: Record<string, number> = {};

      allCards.forEach(card => {
        const raw = card.getAttribute('data-card-technologies') || '';
        const techs = raw.split(',').map(t => t.trim()).filter(Boolean);
        techs.forEach(tech => {
          connections[tech] = (connections[tech] || 0) + 1;
        });
      });

      setTechConnections(connections);

      // Сортируем текущий список по количеству связей
      const sorted = [...technologies].sort((a, b) => (connections[b] || 0) - (connections[a] || 0));
      setSortedTechnologies(sorted);
    };

    updateConnections();

    const observer = new MutationObserver(updateConnections);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-card-technologies']
    });

    window.addEventListener('resize', updateConnections);
    window.addEventListener('scroll', updateConnections, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateConnections);
      window.removeEventListener('scroll', updateConnections);
    };
  }, [technologies]);

  // База порядка
  const baseList = sortedTechnologies.length > 0 ? sortedTechnologies : technologies;

  // Итоговый список: выбранная (если есть) + базовый (без дублей). НИКАКОГО накопления.
  const displayTechnologies = useMemo(() => {
    if (!selectedTech) return baseList;
    const set = new Set<string>([selectedTech, ...baseList]);
    return Array.from(set);
  }, [baseList, selectedTech]);

  // Контейнер для делегирования событий и для ConnectionLines
  const containerRef = useRef<HTMLDivElement>(null);

  // Стабильные refs по имени технологии
  const refsByTech = useRef<Record<string, { current: HTMLDivElement | null }>>({});

  const itemRefs = useMemo(
    () =>
      displayTechnologies.map((tech) => {
        if (!refsByTech.current[tech]) {
          refsByTech.current[tech] = { current: null };
        }
        return refsByTech.current[tech];
      }),
    [displayTechnologies]
  );

  // Hover делегирование
  const handleMouseOver = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const item = target.closest(`.${styles.techItem}`) as HTMLDivElement | null;
    const name = item?.dataset?.techName || null;
    if (!selectedTech && name !== hoveredTech) setHoveredTech(name);
  }, [hoveredTech, selectedTech]);

  const handleMouseOut = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as HTMLElement | null;
    const leftToItem = related?.closest?.(`.${styles.techItem}`);
    if (!leftToItem && !selectedTech) setHoveredTech(null);
  }, [selectedTech]);

  // Клик — переключение ЕДИНСТВЕННОЙ фиксации
  const handleItemClick = useCallback((tech: string) => {
    setSelectedTech(prev => (prev === tech ? null : tech)); // либо снять, либо заменить
    setHoveredTech(tech); // мгновенная подсветка совпадает с выбранной
  }, []);

  return (
    <>
      <ConnectionLines
        itemRefs={itemRefs}
        containerRef={containerRef}
        hoveredTech={hoveredTech}
        selectedTech={selectedTech}
      />

      <div
        ref={containerRef}
        className={styles.technologiesContainer}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <h3 className={styles.title}>Technologies</h3>

        <div className={styles.technologiesList}>
          {displayTechnologies.map((tech) => (
            <div
              key={tech}
              ref={(el) => {
                if (!refsByTech.current[tech]) {
                  refsByTech.current[tech] = { current: el };
                } else {
                  refsByTech.current[tech].current = el;
                }
              }}
              className={[
                styles.techItem,
                hoveredTech === tech ? styles.techItemHovered : '',
                selectedTech === tech ? styles.techItemSelected : '',
              ].join(' ')}
              data-tech-name={tech}
              onClick={() => handleItemClick(tech)}
            >
              <div className={styles.techIconWrapper}>
                <TechIcons techs={[tech]} iconClassName={styles.techIcon} />
              </div>
              <span className={styles.techName}>
                {tech}
                <span className={styles.connectionCount}>
                  {techConnections[tech] ?? 0}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TechnologiesList;
