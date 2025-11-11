import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import '../styles/Auth.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setValidationError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setValidationError('Name is required');
      return false;
    }
    if (formData.name.trim().length < 2) {
      setValidationError('Name must be at least 2 characters');
      return false;
    }
    if (!formData.email.includes('@')) {
      setValidationError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    }
    
    setIsLoading(false);
  };

  const displayError = validationError || error;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="auth-container"
    >
      <div className="auth-wrapper">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="auth-card"
        >
          {/* Header */}
          <div className="auth-header">
            <h1 className="auth-title">Join Us</h1>
            <p className="auth-subtitle">Create an account to save your favorite recipes</p>
          </div>

          {/* Error Message */}
          {displayError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="error-banner"
            >
              <span className="error-icon">⚠️</span>
              <span>{displayError}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Name Input */}
            <motion.div
              className="form-group"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="name" className="form-label">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="form-input"
                disabled={isLoading}
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              className="form-group"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="email" className="form-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="form-input"
                disabled={isLoading}
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              className="form-group"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="password" className="form-label">
                <span className="label-icon">🔐</span>
                Password
              </label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="form-input"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div
              className="form-group"
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="confirmPassword" className="form-label">
                <span className="label-icon">🔐</span>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="form-input"
                disabled={isLoading}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="auth-button"
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p className="auth-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
            <Link to="/" className="back-home-link">
              ← Back to Home
            </Link>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="decorative-elements">
          <div className="sphere sphere-1"></div>
          <div className="sphere sphere-2"></div>
          <div className="sphere sphere-3"></div>
        </div>
      </div>
    </motion.div>
  );
}
