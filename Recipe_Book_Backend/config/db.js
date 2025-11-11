const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('❌ MONGODB_URI not found in environment variables');
    }

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    // You can specify your DB name explicitly (recommended)
    db = client.db('recipeDB');

    // Optional: create indexes for better performance
    const usersCollection = db.collection('users');
    const favoritesCollection = db.collection('favorites');

    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await favoritesCollection.createIndex({ userId: 1 });
    await favoritesCollection.createIndex({ userId: 1, recipeId: 1 }, { unique: true });

    console.log('✅ Connected to MongoDB Atlas successfully');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

module.exports = { connectDB, getDB };
