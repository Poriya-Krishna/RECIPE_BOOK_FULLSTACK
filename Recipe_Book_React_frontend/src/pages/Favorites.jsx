import React from 'react';
import recipes from '../data/recipes.json';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles.css';
import { motion } from 'framer-motion';

export default function Favorites() {
  const { favorites } = useAuth();
  const navigate = useNavigate();

  const favRecipes = recipes.filter((r) => favorites.includes(r.id));

  if (favRecipes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>❤️ No Favorites Yet</h2>
        <p style={{ color: 'rgba(224, 231, 255, 0.7)', marginBottom: '30px' }}>
          Start adding your favorite recipes to see them here!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          Explore Recipes
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ margin: '30px 0', textAlign: 'center', fontSize: '28px' }}>
        ❤️ Your Favorite Recipes ({favRecipes.length})
      </h2>
      <div className="recipe-list">
        {favRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card cursor-target"
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={recipe.image} alt={recipe.name} />
            <div className="meta">
              <h3>{recipe.name}</h3>
              <p>{recipe.time} • Serves {recipe.serves}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
