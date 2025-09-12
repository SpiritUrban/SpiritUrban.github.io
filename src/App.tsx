import { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import IconsBrowser from './pages/IconsBrowser/IconsBrowser';
import './pages/IconsBrowser/IconsBrowser.css';
import Cart1 from './components/Cart-1/Cart1';
import Minimap from './components/Minimap/Minimap';
import Timeline from './components/Timeline/Timeline';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dev/icons" element={<IconsBrowser />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
