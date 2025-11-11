import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        // Fetch favorites from database
        fetchFavorites(JSON.parse(storedUser).id, token);
      } catch (err) {
        console.error('Error restoring user session:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchFavorites = async (userId, token) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/favorites/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setFavorites(response.data.favorites);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password
      });

      const { token, user: userData } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setFavorites([]);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });

      const { token, user: userData } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      await fetchFavorites(userData.id, token);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setFavorites([]);
    setError(null);
  };

  const addFavorite = async (recipeId) => {
    if (!user) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `${API_BASE_URL}/favorites/add`,
        { userId: user.id, recipeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFavorites(response.data.favorites);
      return { success: true };
    } catch (err) {
      console.error('Error adding favorite:', err);
      return { success: false };
    }
  };

  const removeFavorite = async (recipeId) => {
    if (!user) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `${API_BASE_URL}/favorites/remove`,
        { userId: user.id, recipeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFavorites(response.data.favorites);
      return { success: true };
    } catch (err) {
      console.error('Error removing favorite:', err);
      return { success: false };
    }
  };

  const value = {
    user,
    favorites,
    loading,
    error,
    register,
    login,
    logout,
    addFavorite,
    removeFavorite
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
