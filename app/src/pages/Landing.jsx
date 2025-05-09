import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/authContext';
import { FaLock, FaTags, FaChartLine } from 'react-icons/fa';

export default function Landing() {
  const { user } = useAuth();

  return (
    <>
      {/* Top Nav */}
      <header className="landing-header">
        <div className="container">
          <Link to="/" className="site-logo">Spara</Link>
          <nav>
            <a href="#overview" className="btn btn-secondary">Learn More</a>
            {user ? (
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1>See today's habits and tomorrow's trends.</h1>
            <p>
              Unified data, intelligent categorization, and proactive forecasting—
              all in one place.
            </p>
            <div className="hero-buttons">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
              ) : (
                <Link to="/login" className="btn btn-primary">Get Started</Link>
              )}
              <a href="#overview" className="btn btn-secondary">Learn More</a>
            </div>
            {user && (
              <p className="signed-in-text">
                Signed in as {user.email}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="section container">
        <h2>Overview</h2>
        <p>
          In today’s fast-paced world, transactions scatter across accounts and spreadsheets.
          By the time you track them, you’ve overspent. Spara unifies your data via secure
          connections or uploads, applies ML to categorize every purchase, and forecasts
          spending in real time so you stay ahead of your budget.
        </p>
      </section>

      {/* Features */}
      <section className="section container">
        <h2>Key Features</h2>
        <div className="feature-grid">
          {[
            { icon:FaLock,      title:'Secure Connections',   text:'Link banks via OAuth or upload CSVs—no credentials stored.' },
            { icon:FaTags,      title:'Auto Categorization',  text:'AI automatically labels every transaction.' },
            { icon:FaChartLine, title:'Predictive Forecasts', text:'Get month-ahead spending predictions before it’s too late.' }
          ].map((f,i)=>(
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:i*0.2, duration:0.6 }}
            >
              <f.icon className="feature-icon"/>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">© 2025 Spara Services Inc.</div>
      </footer>
    </>
  );
}
