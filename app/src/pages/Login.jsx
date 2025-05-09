import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from "../firebase/firebase"; // Ensure the path is correct
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../contexts/authContext';

export default function Login() {
    const { userLoggedIn } = useAuth();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear any previous errors

        if (email === "" || password === "") {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard"); // Redirect to dashboard on success
        } catch (error) {
            setErrorMessage("Login failed. Please check your email or password.");
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <>
      {/* Top Nav */}
      <header className="landing-header">
        <div className="container">
          <Link to="/" className="site-logo">Spara</Link>
        </div>
      </header>

      {/* Login Section */}
      <section className="hero login-hero">
        <div className="hero-content container">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1>Welcome Back</h1>
            <p>Access your insights and manage your finances easily.</p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="login-form" onSubmit={handleLogin}>
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
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="login-footer">
              <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
              <p><Link to="/forgot-password">Forgot Password?</Link></p>
            </div>
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
