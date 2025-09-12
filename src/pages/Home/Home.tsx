import React, { useRef, RefObject } from 'react';
import { Link } from 'react-router-dom';
import Cart1 from '../../components/Cart-1/Cart1';
import Timeline from '../../components/Timeline/Timeline';
import Minimap, { MinimapProps } from '../../components/Minimap/Minimap';
import TechnologiesList from '../../components/TechnologiesList/TechnologiesList';

const Home: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  
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
          width={120}
          height={300}
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext="0% scrolled"
          aria-orientation="vertical"
          aria-label="Document scroll position"
        />
      </div>
      <div className="right">
        <Link to="/dev/icons" className="dev-link">
          Icons Browser
        </Link>
      </div>
    </div>
  );
};

export default Home;
