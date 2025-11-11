import React from 'react';

const FavoriteButton = ({ isFavorite, onToggleFavorite }) => {
  return (
    <button style={{background:'none', 
    border: "none",
    color: "inherit",
    font: "inherit",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px"}} onClick={onToggleFavorite}>
      {isFavorite ? '❤️ Unfavorite' : '🤍 Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;