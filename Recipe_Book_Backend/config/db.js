const { MongoClient, ObjectId } = require('mongodb');

let db;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe_book';
    const client = new MongoClient(mongoUri);

    await client.connect();
    db = client.db();

    // Create indexes
    const usersCollection = db.collection('users');
    const favoritesCollection = db.collection('favorites');

    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await favoritesCollection.createIndex({ userId: 1 });
    await favoritesCollection.createIndex({ userId: 1, recipeId: 1 }, { unique: true });

    console.log('✅ MongoDB connected successfully');
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
