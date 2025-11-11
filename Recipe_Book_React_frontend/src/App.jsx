import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ThreeScene from './components/ThreeScene';
import { TargetCursor } from './components/TargetCursor';
import RecipePage from './pages/RecipePage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <div style={{ 
          animation: 'spin 1s linear infinite', 
          width: '40px', 
          height: '40px', 
          border: '3px solid rgba(102, 126, 234, 0.3)', 
          borderTop: '3px solid #667eea', 
          borderRadius: '50%' 
        }}></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// Main App Content
function AppContent() {
  const [selected, setSelected] = useState(null);

  return (
    <Router>
      {/* Custom Cursor */}
      <TargetCursor 
        spinDuration={5} 
        hideDefaultCursor={true} 
      />

      <Navbar />
      <div style={{ padding: '0 12px' }}>
        <Routes>
          <Route path="/" element={<Home selected={selected} onSelect={setSelected} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/recipe/:id" 
            element={
              <ProtectedRoute>
                <RecipePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/about" element={<About />} />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } 
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
