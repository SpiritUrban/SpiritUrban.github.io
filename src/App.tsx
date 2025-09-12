import { useRef, useEffect } from 'react'
import React from 'react';
import './App.css'
import Cart1 from './components/Cart-1/Cart1';
import Minimap from './components/Minimap/Minimap';

function App() {
  // Create refs for the content and viewport elements
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Add scrollable class to body on mount
  useEffect(() => {
    document.body.classList.add('scrollable-page');
    document.documentElement.classList.add('scrollable-page');
    
    return () => {
      document.body.classList.remove('scrollable-page');
      document.documentElement.classList.remove('scrollable-page');
    };
  }, []);

  return (
    <div className="app-container">
      <div ref={contentRef}>
        <Cart1 />
        
        {/* Content that will be scrolled */}
        <div className="content-spacer">
          {Array.from({ length: 20 }).map((_, i) => (
            <React.Fragment key={i}>
              <br />
              <hr />
            </React.Fragment>
          ))}
        </div>

        <Cart1 />

      </div>

      {/* Minimap */}
      <Minimap 
        contentRef={contentRef}
        viewportRef={viewportRef}
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
  );
}

export default App;
