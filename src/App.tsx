import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './App.css';
import Home from './pages/Home/Home';
import IconsBrowser from './pages/IconsBrowser/IconsBrowser';
import './pages/IconsBrowser/IconsBrowser.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dev/icons" element={<IconsBrowser />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
