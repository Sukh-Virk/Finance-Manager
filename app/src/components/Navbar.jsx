import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="site-logo">Spara</Link>
        <nav>
          <Link to="/" className="btn btn-secondary">Home</Link>
          {user && <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>}
          {!user && <Link to="/login" className="btn btn-primary">Login</Link>}
          {!user && <Link to="/register" className="btn btn-primary">Register</Link>}
          {user && <button onClick={logout} className="btn btn-secondary">Logout</button>}
        </nav>
        {user && <p className="signed-in">Signed in as {user.email}</p>}
      </div>
    </header>
  );
}