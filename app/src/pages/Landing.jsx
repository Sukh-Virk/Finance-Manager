import React from 'react';
// 1️⃣ Import Link for React‐Router navigation
import { Link } from 'react-router-dom';
// 2️⃣ Import and rename Link from react-scroll for smooth scrolling
import { Link as ScrollLink, Element } from 'react-scroll';
import { motion } from 'framer-motion';
import '../styles.css';

export default function Landing() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Spara
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          See today’s habits and tomorrow’s trends.
        </motion.p>
        <div className="button-group">
          {/* smooth scroll to the About below */}
          <ScrollLink
            to="about"
            smooth={true}
            duration={600}
            className="btn btn-secondary"
          >
            Learn More ↓
          </ScrollLink>
          {/* navigate to /dashboard route */}
          <Link to="/dashboard" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </section>

      {/* About Section */}
      <Element name="about">
        <section className="about-section">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            About Spara
          </motion.h2>
          <motion.div
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            {[
              `In today’s fast paced world, tracking your spending can feel like chasing shadows.`,
              `SpendSight transforms this experience by unifying your data, applying ML categorization, and forecasting your future spending.`,
              `Elegant visualizations, personalized budget targets, and proactive alerts keep you on track—before you exceed your limits.`
            ].map((text, i) => (
              <motion.p key={i} variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}>
                {text}
              </motion.p>
            ))}
          </motion.div>
        </section>
      </Element>
    </>
  );
}
