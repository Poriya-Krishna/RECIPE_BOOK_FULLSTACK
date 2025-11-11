import React, { useState, useEffect } from 'react';
import ThreeScene from './ThreeScene';

export default function RecipeDetail({recipe, onClose}){
  const [showModel, setShowModel] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModelMounted, setIsModelMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowModel(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setShowModel(false);
    setIsModelMounted(false);
    // Add a small delay to ensure proper mounting of 3D model
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsModelMounted(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [recipe, isMobile]);

  const toggleModel = () => {
    setShowModel(prev => !prev);
  };

  return (
    <div className="recipe-detail">
      <div className="recipe-main">
        <div style={{display:'flex',justifyContent:'space-between', alignItems:'start'}}>
          <div>
            <h2 style={{margin:0}}>{recipe.name}</h2>
            <p style={{color:'#9fb4d1'}}>{recipe.time} • Serves {recipe.serves}</p>
          </div>
          <div className="action-buttons">
            {isMobile && (
              <button 
                className="view-3d-btn" 
                onClick={toggleModel}
              >
                {showModel ? 'Hide 3D View' : 'Show 3D View'}
              </button>
            )}
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </div>
        
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          style={{width:'100%',borderRadius:10,marginTop:12}} 
          onClick={toggleModel}
        />

        {isMobile && isModelMounted && (
          <div className={`mobile-canvas-wrap ${showModel ? 'visible' : ''}`}>
            <div className="canvas-container">
              {showModel && <ThreeScene recipe={recipe} />}
            </div>
          </div>
        )}

        <h3 style={{marginTop:14}}>Ingredients</h3>
        <div className="ingredients">
          <ul>
            {recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
          </ul>
        </div>
        <h3 style={{marginTop:14}}>Steps</h3>
        <div>
          {recipe.steps.map((s,idx) => <div key={idx} className="step"><strong>Step {idx+1}:</strong> {s}</div>)}
        </div>
        <div className="footer-note">
          {isMobile ? 'Tip: Click the Show 3D View button to see the 3D model.' : 'Tip: Click other recipes to update the 3D scene.'}
        </div>
      </div>
      <aside style={{width:320}}>
        <div style={{padding:12, borderRadius:10, background:'rgba(255,255,255,0.01)'}}>
          <h4>Quick Info</h4>
          <p>Tags: {recipe.tags.join(', ')}</p>
          <p>Estimated time: {recipe.time}</p>
          <p>Serves: {recipe.serves}</p>
        </div>
      </aside>
    </div>
  )
}