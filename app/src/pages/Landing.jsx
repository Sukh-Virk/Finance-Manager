import React from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="hero">
      <h1>See today’s habits and tomorrow’s trends.</h1>
      <p>Your personal finance tracker with predictive insights and more.</p>
      <div>
        <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
        <Link to="/about"     className="btn btn-secondary">Learn More</Link>
      </div>
    </div>
  );
}
