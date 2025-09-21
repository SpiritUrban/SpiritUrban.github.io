import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUniqueTechnologies } from '../../features/timeline/timelineSelectors';
import { TechIcons } from '../../utils/techIcons';
import ConnectionLines from './ConnectionLines';
import styles from './TechnologiesList.module.css';

const TechnologiesList: React.FC = () => {
  const technologies = useAppSelector(selectUniqueTechnologies);
  const [sortedTechnologies, setSortedTechnologies] = useState<string[]>([]);
  const [techConnections, setTechConnections] = useState<Record<string, number>>({});

  // Ховер — кратковременная подсветка (как было)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  // NEW: выбранная (зафиксированная) технология
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  // NEW: пинованные технологии (не исчезают из списка при динамике)
  const [pinnedTechs, setPinnedTechs] = useState<Set<string>>(new Set());

  // Создаем MutationObserver для отслеживания изменений в DOM с карточками
  useEffect(() => {
    const updateConnections = () => {
      const connections: Record<string, number> = {};
      const allCards = document.querySelectorAll('[data-card-technologies]');

      // Инициализируем счетчики для всех технологий
      technologies.forEach(tech => {
        connections[tech] = 0;
      });

      // Считаем количество карточек для каждой технологии
      allCards.forEach(card => {
        const raw = card.getAttribute('data-card-technologies') || '';
        const techs = raw
          .split(',')
          .map(t => t.trim())
          .filter(Boolean);

        techs.forEach(tech => {
          if (Object.prototype.hasOwnProperty.call(connections, tech)) {
            connections[tech]++;
          }
        });
      });

      setTechConnections(connections);

      // Сортируем технологии по количеству соединений (по убыванию)
      const sorted = [...technologies].sort((a, b) => {
        return (connections[b] || 0) - (connections[a] || 0);
      });

      setSortedTechnologies(sorted);
    };

    // Инициализируем начальную сортировку
    updateConnections();

    // Настраиваем MutationObserver для отслеживания изменений в DOM
    const observer = new MutationObserver(updateConnections);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-card-technologies']
    });

    // Обновляем сортировку при изменении списка технологий
    const techObserver = new MutationObserver(updateConnections);
    const techContainer = document.querySelector('.technologiesList');
    if (techContainer) {
      techObserver.observe(techContainer, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      techObserver.disconnect();
    };
  }, [technologies]);

  // Базовый список для отображения
  const baseList = sortedTechnologies.length > 0 ? sortedTechnologies : technologies;

  // Итоговый список: выбранная (если есть) → все pinned → базовый (без дублей)
  const displayTechnologies = useMemo(() => {
    const union = new Set<string>([
      ...(selectedTech ? [selectedTech] : []),
      ...Array.from(pinnedTechs),
      ...baseList,
    ]);
    return Array.from(union);
  }, [baseList, pinnedTechs, selectedTech]);

  // Контейнер (для делегирования событий и для ConnectionLines)
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Стабильные refs по имени технологии (а не по индексу):
   * сохраняются между рендерами и не ломаются при перестановках/фильтрах.
   */
  const refsByTech = useRef<Record<string, { current: HTMLDivElement | null }>>({});

  // Генерим массив refs в порядке текущего displayTechnologies, но с устойчивыми объектами
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

  // Делегируем hover на контейнер: меньше обработчиков и GC-нагрузки
  const handleMouseOver = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const item = target.closest(`.${styles.techItem}`) as HTMLDivElement | null;
    const name = item?.dataset?.techName || null;
    // если есть зафиксированная — hover не обязателен, но не мешает
    if (!selectedTech && name !== hoveredTech) setHoveredTech(name);
  }, [hoveredTech, selectedTech]);

  const handleMouseOut = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as HTMLElement | null;
    const leftToItem = related?.closest?.(`.${styles.techItem}`);
    // Если ушли за пределы списка или не над .techItem — сбрасываем
    // НО: при наличии selectedTech подсветку не гасим
    if (!leftToItem && !selectedTech) setHoveredTech(null);
  }, [selectedTech]);

  // Клик по элементу — переключение фиксации технологии + пин
  const handleItemClick = useCallback((tech: string) => {
    setHoveredTech(tech); // мгновенный отклик
    setSelectedTech(prev => {
      const next = prev === tech ? null : tech;
      setPinnedTechs(prevPins => {
        const pins = new Set(prevPins);
        if (next) pins.add(tech); else pins.delete(tech);
        return pins;
      });
      return next;
    });
  }, []);

  return (
    <>
      {/* Рисуем линии один раз, меняем только входные данные */}
      <ConnectionLines
        itemRefs={itemRefs}
        containerRef={containerRef}
        hoveredTech={hoveredTech}
        selectedTech={selectedTech} // NEW
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
                // Прямо присваиваем в устойчивый ref-объект по ключу
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
                <span className={styles.connectionCount}>{techConnections[tech] || 0}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TechnologiesList;
