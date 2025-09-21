import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './App.css';
import Home from './pages/Home/Home';
import IconsBrowser from './pages/IconsBrowser/IconsBrowser';
import DeviconBrowser from './pages/DeviconBrowser/DeviconBrowser';
import './pages/IconsBrowser/IconsBrowser.css';
import './pages/DeviconBrowser/DeviconBrowser.css';
import Dev from './pages/Dev/Dev';
import './pages/Dev/Dev.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="/dev/icons" element={<IconsBrowser />} />
            <Route path="/dev/devicons" element={<DeviconBrowser />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
