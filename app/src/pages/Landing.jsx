import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaTags, FaChartLine, FaWallet } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <>
      {/* Top Navigation */}
      <header className="landing-header">
        <div className="container">
          <Link to="/" className="site-logo">Spara</Link>
          <nav aria-label="Primary Navigation">
            <a href="#overview" className="btn btn-secondary">Overview</a>
            <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-content container">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hero-text"
            >
              <h1 id="hero-heading">See today’s habits and tomorrow’s trends.</h1>
              <p>
                Unified data, intelligent categorization, and proactive forecasting—
                all in one place.
              </p>
              <div className="hero-buttons" role="navigation" aria-label="Hero Actions">
                <Link to="/login" className="btn btn-primary">Get Started</Link>
                <a href="#overview" className="btn btn-secondary">Learn More</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hero-icon"
            >
              <FaWallet aria-hidden="true" className="wallet-icon" />
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="section container" aria-labelledby="overview-heading">
          <motion.h2 
            id="overview-heading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Overview
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="overview-text"
          >
            In today’s fast-paced world, transactions scatter across accounts and spreadsheets.
            By the time you track them, you’ve overspent. Spara unifies your data via secure
            connections or uploads, applies ML to categorize every purchase, and forecasts
            spending in real-time so you stay ahead of your budget.
          </motion.p>
        </section>

        {/* Features Section */}
        <section className="section container" aria-labelledby="features-heading">
          <h2 id="features-heading">Key Features</h2>
          <div className="feature-grid" role="list">
            {[
              { icon: FaLock, title: 'Secure Connections', text: 'Link banks via OAuth or upload CSVs—no credentials stored.' },
              { icon: FaTags, title: 'Auto Categorization', text: 'AI automatically labels every transaction.' },
              { icon: FaChartLine, title: 'Predictive Forecasts', text: 'Get month-ahead spending predictions before it’s too late.' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                role="listitem"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <feature.icon className="feature-icon" aria-hidden="true" />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Spara Services Inc.</p>
        </div>
      </footer>
    </>
  );
}