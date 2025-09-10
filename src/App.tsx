import { useState, useRef } from 'react'
import React from 'react';
import './App.css'
import Cart1 from './components/Cart-1/Cart1';
import Minimap from './components/Minimap/Minimap';

function App() {
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={viewportRef} className="app-container">
      <div ref={contentRef} className="content-wrapper">
        <Cart1 />
        
        {/* Content that will be scrolled */}
        <div className="content-spacer">
          {Array.from({ length: 200 }).map((_, i) => (
            <React.Fragment key={i}>
              <hr />
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Minimap */}
      <Minimap 
        contentRef={contentRef}
        viewportRef={viewportRef}
        width={120}
        height={300}
      />
    </div>
  );
}

export default App;
