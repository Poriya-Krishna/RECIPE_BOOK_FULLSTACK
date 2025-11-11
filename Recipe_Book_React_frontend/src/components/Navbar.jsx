
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './TargetCursor.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeGlitter, setActiveGlitter] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const createBurstParticles = (e, link) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'burst-particle';
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 100;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;

      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        !e.target.closest('.nav-links') &&
        !e.target.closest('.menu-toggle')
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const handleMouseMove = (e, element) => {
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty('--x', `${x}%`);
    element.style.setProperty('--y', `${y}%`);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const renderNavLink = (to, text) => (
    <motion.div
      className="nav-link-container"
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setActiveGlitter(text)}
      onHoverEnd={() => setActiveGlitter(null)}
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-link cursor-target ${isActive ? 'active' : ''} ${
            activeGlitter === text ? 'glitter-active' : ''
          }`
        }
        onClick={(e) => {
          createBurstParticles(e, text);
          setIsMenuOpen(false);
        }}
        onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
      >
        <span className="nav-text">{text}</span>
        <div className="glitter-container">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="glitter-particle"
              style={{
                '--delay': `${i * 0.1}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="neon-glow" />
        <div className="highlight-effect" />
      </NavLink>
    </motion.div>
  );

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="nav-content">
        {/* Logo Section */}
        <motion.div
          className="logo-container cursor-target"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink to="/" className="logo-link">
            <img
              src="/poriya-resto.png"
              alt="Poriya's Resto Logo"
              className="logo"
            />
            <span className="logo-text">
              PORIYA’s Étoile, <span className="city-name">London</span>
            </span>
          </NavLink>
        </motion.div>

        {/* Menu Toggle */}
        <motion.button
          className={`menu-toggle cursor-target ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>

        {/* Navigation Links */}
        <motion.div
          className={`nav-links ${isMenuOpen ? 'open' : ''}`}
          initial={false}
          animate={{
            right: isMenuOpen ? 0 : '-100%',
            opacity: isMenuOpen ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          {renderNavLink('/', 'Home')}
          {user && renderNavLink('/favorites', 'Favorites')}
          {renderNavLink('/about', 'About')}
          {renderNavLink('/contact', 'Contact')}
          
          {/* User Section */}
          <div className="nav-divider"></div>
          {user ? (
            <>
              <div className="user-info">
                <span className="user-icon">👤</span>
                <span className="user-name">{user.name}</span>
              </div>
              <motion.button
                className="nav-link cursor-target logout-btn"
                onClick={handleLogout}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="nav-text">Logout</span>
              </motion.button>
            </>
          ) : (
            <>
              {renderNavLink('/login', 'Login')}
              {renderNavLink('/register', 'Register')}
            </>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
}
