import React, { useRef, useEffect, useState, useMemo } from 'react';
import styles from './TechnologiesList.module.css';

interface ConnectionLinesProps {
  itemRefs: Array<{ current: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLElement | null>;
  timelineRef?: React.RefObject<HTMLElement | null>;
  hoveredTech: string | null;
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

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ itemRefs, hoveredTech }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [_, setForceUpdate] = useState(0);
  const rafId = useRef<number | null>(null);

  /** 1) Строим индекс карточек -> по технологии (один раз, поддерживаем мутациями) */
  const cardsIndexRef = useRef<Map<string, Set<Element>>>(new Map());

  useEffect(() => {
    const buildIndex = () => {
      const idx = new Map<string, Set<Element>>();
      const all = document.querySelectorAll('[data-card-technologies]');
      
      all.forEach((el) => {
        const raw = el.getAttribute('data-card-technologies') || '';
        console.log('Raw technologies:', raw);
        
        // Split by comma and trim whitespace
        const tokens = raw
          .split(',')
          .map(tech => tech.trim())
          .filter(Boolean);
          
        console.log('Processed tokens:', tokens);

        tokens.forEach((name) => {
          const key = name.toLowerCase().trim();
          if (!idx.has(key)) {
            idx.set(key, new Set());
          }
          idx.get(key)!.add(el);
          console.log(`Added card for technology: "${key}". Total cards for this tech:`, idx.get(key)?.size);
        });
      });
      
      // Log the complete index for debugging
      console.log('Technology index:', Object.fromEntries(idx));
      cardsIndexRef.current = idx;
    };

    buildIndex();

    // Если список карточек динамический — держим индекс актуальным
    const mo = new MutationObserver(buildIndex);
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-card-technologies'] });
    return () => mo.disconnect();
  }, []);

  /** 2) Геометрия линий (оптимизировано, без «частичного совпадения» в селекторе) */
  const connectionLines = useMemo<ConnectionLine[]>(() => {
    const lines: ConnectionLine[] = [];
    if (typeof window === 'undefined') return lines;

    itemRefs.forEach((ref, index) => {
      const el = ref.current;
      if (!el) return;

      const techName = el.getAttribute('data-tech-name');
      if (!techName) return;

      // ВАЖНО: изолированная подсветка — строго равенство
      const isHighlighted = hoveredTech !== null && hoveredTech === techName;

      const rect = el.getBoundingClientRect();
      const startX = rect.right;
      const startY = rect.top + rect.height / 2;

      // Normalize the technology name for matching (case-insensitive, trim, and handle special chars)
      const normalizeForMatching = (str: string) => 
        str.toLowerCase()
          .trim()
          .replace(/[^a-z0-9]/g, ''); // Remove all non-alphanumeric chars
      
      const normalizedTechName = normalizeForMatching(techName);
      console.log(`Looking up technology: "${techName}" (normalized: "${normalizedTechName}") in index`);
      
      // Find all matching technologies (case-insensitive, ignoring special chars)
      let cards: Set<Element> | undefined;
      for (const [tech, elements] of cardsIndexRef.current.entries()) {
        if (normalizeForMatching(tech) === normalizedTechName) {
          cards = elements;
          break;
        }
      }
      
      if (!cards || cards.size === 0) {
        console.warn(`No cards found for technology: "${techName}" (normalized: "${normalizedTechName}")`);
        console.log('Available technologies:', Array.from(cardsIndexRef.current.keys()));
        return;
      }
      console.log(`Found ${cards.size} cards for technology: "${normalizedTechName}"`);

      let i = 0;
      cards.forEach((cardEl) => {
        const r = (cardEl as HTMLElement).getBoundingClientRect();
        const endX = r.left + r.width / 2;
        const endY = r.top + r.height / 2;

        lines.push({
          id: `line-${index}-${i++}-${techName}`,
          startX,
          startY,
          endX,
          endY,
          visible: true,
          isHighlighted,
        });
      });
    });

    return lines;
  }, [itemRefs, hoveredTech]);

  /** 3) S-кривая */
  const createCurvedPath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = (x2 - x1) / 3;
    const c1x = x1 + dx, c1y = y1;
    const c2x = x2 - dx, c2y = y2;
    return `M${x1},${y1} C${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`;
  };

  /** 4) Один RAF на resize/scroll (как было), без лишних стейтов */
  useEffect(() => {
    const schedule = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => setForceUpdate((n) => n + 1));
    };
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

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
          // ширину теперь лучше контролировать в CSS через .highlighted (для анимации),
          // но оставляем fallback, чтобы не ломать существующее поведение
          strokeWidth={line.isHighlighted ? 3 : 1}
        />
      ))}
    </svg>
  );
};

export default ConnectionLines;
