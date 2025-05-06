import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing   from './pages/Landing';
import Dashboard from './pages/Dashboard';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      {/* Site Header */}
      <header>
        <div className="container">
          <Link to="/" className="site-logo">Spara</Link>
          <nav>
            {/* Smooth scroll to Landing’s About section */}
            <a href="#about" className="nav-link">About</a>
            {/* Navigate to Dashboard route */}
            <Link to="/dashboard" className="btn btn-primary">Login</Link>
          </nav>
        </div>
      </header>

      {/* Main content: Landing (with embedded About) and Dashboard */}
      <main>
        <Routes>
          <Route path="/"         element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Site Footer */}
      <footer>
        <div className="container">
          © 2025 Spara. All rights reserved.
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
