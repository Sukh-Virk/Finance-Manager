import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing   from './pages/Landing';
import About     from './pages/About';
import Dashboard from './pages/Dashboard';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="container">
          <Link to="/" className="site-logo">Spara</Link>
          <nav>
            <Link to="/about">About</Link>
            <Link to="/dashboard" className="btn btn-primary">Login</Link>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/"         element={<Landing />} />
          <Route path="/about"    element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <footer>
        <div className="container">© 2025 Spara. All rights reserved.</div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
