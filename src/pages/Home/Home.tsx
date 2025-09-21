import React, { useRef, useState } from 'react';
import type { RefObject, FC } from 'react';
import Cart1 from '../../components/Cart-1/Cart1';
import Timeline from '../../components/Timeline/Timeline';
import Minimap from '../../components/Minimap/Minimap';
import TechnologiesList from '../../components/TechnologiesList/TechnologiesList';
import TechnologiesProgress from '../../components/TechnologiesProgress/TechnologiesProgress';
import './Home.css';

const Home: FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isRightOpen, setIsRightOpen] = useState(false);

  // Create type-safe refs for the Minimap component
  const minimapContentRef = contentRef as unknown as RefObject<HTMLElement>;
  const minimapViewportRef = viewportRef as unknown as RefObject<HTMLElement>;

  return (
    <div className="base-container">
      <div className="left">
        <TechnologiesList />
      </div>
      <div className="center">
        <div ref={contentRef}>
          <Cart1 />

          {/* Content that will be scrolled */}
          <div className="content-spacer">
            {Array.from({ length: 0 }).map((_, i) => (
              <React.Fragment key={i}>
                <br />
                <hr />
                ХХХ
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="section-container">
          <h2 className="section-title">Work Experience</h2>
          <Timeline />
        </div>

        {/* Minimap */}
        <Minimap
          contentRef={minimapContentRef}
          viewportRef={minimapViewportRef}
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext="0% scrolled"
          aria-orientation="vertical"
          aria-label="Document scroll position"
        />
      </div>
      <div
        id="right-panel"
        className={`right ${isRightOpen ? 'open' : ''}`}
        role="dialog"
      >
        <button
          type="button"
          className="right-close"
          aria-label="Close details panel"
          onClick={() => setIsRightOpen(false)}
        >
          ✕
        </button>
        <TechnologiesProgress />
      </div>

      {/* Mobile spine trigger */}
      <button
        type="button"
        className="right-spine"
        aria-label="Открыть панель прогресса"
        aria-controls="right-panel"
        onClick={() => setIsRightOpen(true)}
      >
        <span className="right-spine-label" title="Открыть панель прогресса">Open Progress Panel</span>
      </button>
    </div>
  );
};

export default Home;
