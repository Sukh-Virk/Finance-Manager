import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { register } from '../firebase/auth';  // Adjust the path if needed
import { useAuth } from '../contexts/authContext'; // Adjust the path if needed

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await register(email, password);
      navigate('/dashboard'); // Redirect after successful registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Top Nav */}
      <header className="landing-header">
        <div className="container">
          <Link to="/" className="site-logo">Spara</Link>
          <nav>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Sign Up Section */}
      <section className="hero signup-hero">
        <div className="hero-content container">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1>Create Your Account</h1>
            <p>Join Spara and start managing your finances effortlessly.</p>
            {error && <p className="error">{error}</p>}
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            <div className="signup-footer">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <FaUserPlus style={{ fontSize: '6rem', color: '#85e085' }} />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">© 2025 Spara Services Inc.</div>
      </footer>
    </>
  );
}
