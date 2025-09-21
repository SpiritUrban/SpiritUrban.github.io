import React, { useRef, useEffect, useState, useMemo } from 'react';
import styles from './TechnologiesList.module.css';

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLElement | null>;
  timelineRef?: React.RefObject<HTMLElement | null>;
  hoveredTech: string | null;
  selectedTech?: string | null;
}

type ConnectionLine = {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  visible: boolean;
  isHighlighted?: boolean;
};

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs, hoveredTech, selectedTech }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [_, setForceUpdate] = useState(0);
  const rafId = useRef<number | null>(null);

  /** Индекс карточек по технологии (берём из data-card-technologies на .timelineItem) */
  const cardsIndexRef = useRef<Map<string, Set<Element>>>(new Map());

  useEffect(() => {
    const buildIndex = () => {
      const idx = new Map<string, Set<Element>>();
      const all = document.querySelectorAll('[data-card-technologies]'); // есть в Timeline.tsx на корне карточки 
      all.forEach((el) => {
        const raw = el.getAttribute('data-card-technologies') || '';
        const tokens = raw.split(',').map(t => t.trim()).filter(Boolean);
        tokens.forEach((name) => {
          const key = name.toLowerCase().trim();
          if (!idx.has(key)) idx.set(key, new Set());
          idx.get(key)!.add(el);
        });
      });
      cardsIndexRef.current = idx;
    };

    buildIndex();
    const mo = new MutationObserver(buildIndex);
    mo.observe(document.body, {
      childList: true, subtree: true, attributes: true, attributeFilter: ['data-card-technologies']
    });
    return () => mo.disconnect();
  }, []);

  /** Геометрия линий */
  const connectionLines = useMemo<ConnectionLine[]>(() => {
    const lines: ConnectionLine[] = [];
    if (typeof window === 'undefined') return lines;

    const normalize = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

    itemRefs.forEach((ref, index) => {
      const el = ref.current;
      if (!el) return;

      const techName = el.getAttribute('data-tech-name');
      if (!techName) return;

      const isHighlighted =
        (hoveredTech && hoveredTech === techName) ||
        (selectedTech && selectedTech === techName) || false;

      const rect = el.getBoundingClientRect();
      const startX = rect.right;
      const startY = rect.top + rect.height / 2;

      // найти карточки-цели
      const norm = normalize(techName);
      let cards: Set<Element> | undefined;
      for (const [tech, elements] of cardsIndexRef.current.entries()) {
        if (normalize(tech) === norm) {
          cards = elements;
          break;
        }
      }
      if (!cards || cards.size === 0) return;

      let i = 0;
      cards.forEach((cardEl) => {
        const r = (cardEl as HTMLElement).getBoundingClientRect();
        const endX = r.left + r.width / 2;
        const endY = r.top + r.height / 2;

        lines.push({
          id: `line-${index}-${i++}-${techName}`,
          startX, startY, endX, endY,
          visible: true,
          isHighlighted,
        });
      });
    });

    return lines;
  }, [itemRefs, hoveredTech, selectedTech]);

  /** S-кривая */
  const createCurvedPath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = (x2 - x1) / 3;
    const c1x = x1 + dx, c1y = y1;
    const c2x = x2 - dx, c2y = y2;
    return `M${x1},${y1} C${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`;
  };

  /** Один RAF на resize/scroll */
  useEffect(() => {
    const schedule = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => setForceUpdate(n => n + 1));
    };
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  /**
   * Подсветка карточек и иконок через data-атрибуты (устойчиво к CSS Modules).
   * 1) Снимаем старые атрибуты.
   * 2) Берём activeTech = selectedTech || hoveredTech.
   * 3) На карточку ставим data-selected-tech="Технология".
   * 4) Внутри карточки у элементов с [title] совпадающим — ставим data-tech-selected="1".
   */
  const prevHighlightedCardsRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const normalize = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

    // снять прошлую подсветку
    prevHighlightedCardsRef.current.forEach((cardEl) => {
      (cardEl as HTMLElement).removeAttribute('data-selected-tech');
      // убрать флаги на всех потомках
      const flagged = cardEl.querySelectorAll('[data-tech-selected="1"]');
      flagged.forEach(node => (node as HTMLElement).removeAttribute('data-tech-selected'));
    });
    prevHighlightedCardsRef.current.clear();

    const activeTech = selectedTech || hoveredTech;
    if (!activeTech) return;

    // найти карточки для активной технологии
    let cards: Set<Element> | undefined;
    const activeNorm = normalize(activeTech);
    for (const [tech, elements] of cardsIndexRef.current.entries()) {
      if (normalize(tech) === activeNorm) {
        cards = elements;
        break;
      }
    }
    if (!cards || cards.size === 0) return;

    // Пометить карточки и иконки
    cards.forEach((cardEl) => {
      (cardEl as HTMLElement).setAttribute('data-selected-tech', activeTech);

      // поджечь ровно ту иконку — ищем по [title]
      // (TechIcons в вашей разметке использует title на контейнере иконки/элементе, см. стили тултипа) 
      const titleNodes = cardEl.querySelectorAll<HTMLElement>('[title]');
      titleNodes.forEach(node => {
        const t = node.getAttribute('title') || '';
        if (normalize(t) === activeNorm) {
          node.setAttribute('data-tech-selected', '1');
        }
      });

      prevHighlightedCardsRef.current.add(cardEl);
    });
  }, [hoveredTech, selectedTech]);

  if (connectionLines.length === 0) return null;

  return (
    <svg
      ref={svgRef}
      className={styles.connectionSvg}
      width="100%"
      height="100%"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}
    >
      {connectionLines.map((line) => (
        <path
          key={line.id}
          d={createCurvedPath(line.startX, line.startY, line.endX, line.endY)}
          className={`${styles.connectionLine} ${line.isHighlighted ? styles.highlighted : ''}`}
          fill="none"
          strokeWidth={line.isHighlighted ? 3 : 1}
        />
      ))}
    </svg>
  );
};

export default ConnectionLines;
