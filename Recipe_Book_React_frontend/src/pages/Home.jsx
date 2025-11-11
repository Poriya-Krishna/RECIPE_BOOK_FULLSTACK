import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import ThreeScene from '../components/ThreeScene';
import recipes from '../data/recipes.json';
import { AUDIO_EXTENSIONS } from 'react-player/patterns';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export default function Home({onSelect, selected, favorite, toggleFavoriteInApp}){
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();

  const handleClick = (recipeId) => {
    console.log("Recipe id :",recipeId);
    navigate(`/recipe/${recipeId}`);
  }
  return (
    <div className="main-content">
      <div className="recipe-list-container">
        <RecipeList 
          recipes={recipes} 
          onSelect={onSelect} 
          selected={selected}
          favorite={favorite}
          toggleFavorite={toggleFavoriteInApp}
          recipeId={recipes.id}
          onNavigate={handleClick}
          isMobile={isMobile}
        />
      </div>
      {!isMobile && selected && (
        <div className="three-scene-container">
          <ThreeScene recipe={selected} />
        </div>
      )}
    </div>
  )
}