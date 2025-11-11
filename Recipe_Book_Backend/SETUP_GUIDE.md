# Backend Setup Guide

This guide will help you set up the Node.js/Express backend for the Recipe Book application with MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation Steps

### 1. Create a backend directory

```bash
cd e:\EIT_MINIPROJECT
mkdir Recipe_Book_Backend
cd Recipe_Book_Backend
```

### 2. Initialize npm project

```bash
npm init -y
```

### 3. Install dependencies

```bash
npm install express cors dotenv mongodb bcryptjs jsonwebtoken axios
npm install --save-dev nodemon
```

### 4. Create project structure

```
Recipe_Book_Backend/
├── server.js
├── .env
├── .gitignore
├── models/
│   ├── User.js
│   └── Favorite.js
├── routes/
│   ├── auth.js
│   └── favorites.js
├── controllers/
│   ├── authController.js
│   └── favoritesController.js
├── middleware/
│   └── auth.js
└── config/
    └── db.js
```

### 5. Create .env file

Create a `.env` file in the backend directory with:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/recipe_book
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipe_book

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### 6. Update package.json scripts

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### 7. Copy the backend files

Copy all the files from the `backend-files/` folder to your `Recipe_Book_Backend/` directory.

### 8. Start MongoDB

**If using local MongoDB:**
```bash
mongod
```

**If using MongoDB Atlas:**
- Update the MONGODB_URI in .env with your connection string

### 9. Start the backend server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
✅ Server running on port 5000
```

## Testing the API

### Register a new user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Add favorite

```bash
curl -X POST http://localhost:5000/api/favorites/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_from_login>" \
  -d '{"userId":"<user_id>","recipeId":1}'
```

## Troubleshooting

### Connection refused on port 5000
- Make sure no other process is using port 5000
- Change PORT in .env

### MongoDB connection error
- Verify MongoDB is running (mongod in another terminal)
- Check MONGODB_URI in .env
- For MongoDB Atlas, ensure IP is whitelisted

### CORS errors
- CORS is already enabled in the backend
- Make sure frontend is accessing http://localhost:5000

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Favorites
- `GET /api/favorites/:userId` - Get user's favorites
- `POST /api/favorites/add` - Add recipe to favorites
- `POST /api/favorites/remove` - Remove recipe from favorites

## Next Steps

1. Start the backend server with `npm run dev`
2. The frontend will automatically connect to `http://localhost:5000`
3. Test the login and favorites features

For production deployment, update environment variables and ensure MongoDB Atlas is properly configured.
