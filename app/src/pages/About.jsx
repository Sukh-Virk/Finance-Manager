import React from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container about-content">
      <h1>About Spara</h1>
      <p>In today’s fast paced world, tracking your spending can feel like chasing shadows…</p>
      <p>SpendSight transforms this experience by unifying your data, applying ML categorization, and forecasting your future spending.</p>
      <p>Elegant visualizations, personalized budget targets, and proactive alerts keep you on track—before you exceed your limits.</p>
      <Link to="/" className="btn btn-secondary">← Back to Home</Link>
    </div>
  );
}
