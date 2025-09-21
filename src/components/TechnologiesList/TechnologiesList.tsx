import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUniqueTechnologies } from '../../features/timeline/timelineSelectors';
import { TechIcons } from '../../utils/techIcons';
import ConnectionLines from './ConnectionLines';
import styles from './TechnologiesList.module.css';

const TechnologiesList: React.FC = () => {
  // Может зависеть от видимых карточек, оставляем как есть (для базового порядка),
  // но СЧЁТЧИК теперь считаем по всему DOM, а не по этому списку.
  const technologies = useAppSelector(selectUniqueTechnologies);

  const [sortedTechnologies, setSortedTechnologies] = useState<string[]>([]);
  const [techConnections, setTechConnections] = useState<Record<string, number>>({});

  // Ховер — кратковременная подсветка
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  // NEW: выбранная (зафиксированная) технология
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  // NEW: пинованные технологии (не исчезают из списка при динамике)
  const [pinnedTechs, setPinnedTechs] = useState<Set<string>>(new Set());

  /**
   * Подсчёт связей (ЛИНИЙ) по всему DOM:
   * - собираем все [data-card-technologies]
   * - для каждого tech инкрементим счётчик
   * - НЕ привязано к текущему Redux-списку
   */
  useEffect(() => {
    const updateConnections = () => {
      // 1) Собираем все карточки на странице
      const allCards = document.querySelectorAll('[data-card-technologies]');

      // 2) Строим общий счётчик для ВСЕХ обнаруженных технологий
      const connections: Record<string, number> = {};

      allCards.forEach(card => {
        const raw = card.getAttribute('data-card-technologies') || '';
        const techs = raw
          .split(',')
          .map(t => t.trim())
          .filter(Boolean);

        techs.forEach(tech => {
          connections[tech] = (connections[tech] || 0) + 1;
        });
      });

      setTechConnections(connections);

      // 3) Сортируем ТЕКУЩИЙ Redux-список по количеству связей (по убыванию).
      // Если теха нет в connections (редкий случай) — считаем 0.
      const sorted = [...technologies].sort((a, b) => {
        return (connections[b] || 0) - (connections[a] || 0);
      });
      setSortedTechnologies(sorted);
    };

    // Инициализация
    updateConnections();

    // Следим за структурой DOM (карточки появляются/исчезают, меняются атрибуты)
    const observer = new MutationObserver(updateConnections);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-card-technologies']
    });

    // На случай динамической подгрузки и редких пересчётов — небольшой fallback
    window.addEventListener('resize', updateConnections);
    window.addEventListener('scroll', updateConnections, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateConnections);
      window.removeEventListener('scroll', updateConnections);
    };
  }, [technologies]);

  // Базовый список для отображения
  const baseList = sortedTechnologies.length > 0 ? sortedTechnologies : technologies;

  // Итоговый список: выбранная → pinned → базовый (без дублей)
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
    if (!selectedTech && name !== hoveredTech) setHoveredTech(name);
  }, [hoveredTech, selectedTech]);

  const handleMouseOut = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as HTMLElement | null;
    const leftToItem = related?.closest?.(`.${styles.techItem}`);
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
