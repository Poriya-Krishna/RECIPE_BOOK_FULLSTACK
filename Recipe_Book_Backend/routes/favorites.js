const express = require('express');
const { getDB } = require('../config/db');
const authMiddleware = require('../middleware/auth');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Get favorites for a user
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const db = getDB();
    const favoritesCollection = db.collection('favorites');

    const userFavorites = await favoritesCollection
      .find({ userId })
      .toArray();

    const favorites = userFavorites.map(fav => fav.recipeId);

    res.json({
      message: 'Favorites retrieved successfully',
      favorites
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Failed to get favorites', error: error.message });
  }
});

// Add favorite
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    if (!userId || recipeId === undefined) {
      return res.status(400).json({ message: 'userId and recipeId are required' });
    }

    const db = getDB();
    const favoritesCollection = db.collection('favorites');

    // Check if already added
    const existing = await favoritesCollection.findOne({ userId, recipeId });
    if (existing) {
      return res.status(400).json({ message: 'Recipe already in favorites' });
    }

    // Add to favorites
    await favoritesCollection.insertOne({
      userId,
      recipeId,
      addedAt: new Date()
    });

    // Get updated favorites list
    const userFavorites = await favoritesCollection
      .find({ userId })
      .toArray();

    const favorites = userFavorites.map(fav => fav.recipeId);

    res.status(201).json({
      message: 'Recipe added to favorites',
      favorites
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ message: 'Failed to add favorite', error: error.message });
  }
});

// Remove favorite
router.post('/remove', authMiddleware, async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    if (!userId || recipeId === undefined) {
      return res.status(400).json({ message: 'userId and recipeId are required' });
    }

    const db = getDB();
    const favoritesCollection = db.collection('favorites');

    // Remove from favorites
    await favoritesCollection.deleteOne({ userId, recipeId });

    // Get updated favorites list
    const userFavorites = await favoritesCollection
      .find({ userId })
      .toArray();

    const favorites = userFavorites.map(fav => fav.recipeId);

    res.json({
      message: 'Recipe removed from favorites',
      favorites
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ message: 'Failed to remove favorite', error: error.message });
  }
});

module.exports = router;
