# Recipe Book React - Complete Setup Guide

A full-stack Recipe Book application with user authentication and persistent favorites storage.

## 🎯 Features

✅ **User Authentication**
- Register new accounts
- Secure login with JWT tokens
- Session persistence with localStorage
- Logout functionality

✅ **Responsive Login/Register Pages**
- Beautiful, modern UI with animations
- Form validation
- Error handling
- Password visibility toggle
- Responsive design (mobile-friendly)

✅ **Database Integration**
- MongoDB for persistent storage
- User profile management
- Favorites storage per user
- Secure password hashing with bcryptjs

✅ **Favorites Management**
- Add/remove recipes from favorites
- Favorites synced across sessions
- Protected routes for authenticated users
- Real-time favorites list

✅ **Beautiful UI/UX**
- Glassmorphism design
- Smooth animations with Framer Motion
- Custom cursor effects
- Dark theme with gradient accents
- Mobile responsive

## 📁 Project Structure

```
Recipe_Book_React/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx (Updated with auth)
│   │   ├── FavoriteButton.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Login.jsx (New)
│   │   ├── Register.jsx (New)
│   │   ├── RecipePage.jsx (Updated)
│   │   ├── Favorites.jsx (Updated)
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.jsx (New - Global Auth State)
│   ├── styles/
│   │   └── Auth.css (New - Auth Pages Styling)
│   ├── App.jsx (Updated with Auth Provider)
│   └── ...
└── ...

Recipe_Book_Backend/
├── config/
│   └── db.js (MongoDB connection)
├── middleware/
│   └── auth.js (JWT authentication)
├── routes/
│   ├── auth.js (Login/Register endpoints)
│   └── favorites.js (Favorites endpoints)
├── server.js (Express server)
├── package.json
├── .env (Environment variables)
└── SETUP_GUIDE.md
```

## 🚀 Quick Start

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd e:\EIT_MINIPROJECT\Recipe_Book_React
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

### Backend Setup

1. **Create backend directory:**
   ```bash
   cd e:\EIT_MINIPROJECT
   mkdir Recipe_Book_Backend
   cd Recipe_Book_Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env` file from the backend
   - Update `MONGODB_URI` if using MongoDB Atlas

4. **Ensure MongoDB is running:**
   
   **Local MongoDB:**
   ```bash
   mongod
   ```

   **Or use MongoDB Atlas:**
   - Create a free account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string and update `.env`

5. **Start the backend:**
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

## 🔐 Authentication Flow

### Registration
1. User fills registration form (Name, Email, Password, Confirm Password)
2. Frontend validates the form
3. Frontend sends data to `/api/auth/register`
4. Backend hashes password with bcryptjs
5. User document created in MongoDB
6. JWT token generated and returned
7. Token & user info stored in localStorage
8. AuthContext updated with user data
9. User redirected to home page

### Login
1. User enters email and password
2. Frontend sends credentials to `/api/auth/login`
3. Backend verifies email and password
4. JWT token generated
5. Token & user info stored in localStorage
6. AuthContext updated with user data and favorites
7. User redirected to home page

### Session Persistence
- On page load, AuthContext checks localStorage for token
- If valid token exists, user is automatically logged in
- Favorites are fetched from database

### Logout
- User clicks logout in navbar
- Token removed from localStorage
- AuthContext cleared
- User redirected to home page

## 💾 Database Schema

### Users Collection
```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password_here",
  "createdAt": ISODate("2024-01-01T10:00:00Z")
}
```

### Favorites Collection
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "recipeId": 1,
  "addedAt": ISODate("2024-01-01T10:00:00Z")
}
```

## 🔌 API Endpoints

### Authentication Endpoints

**Register User**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user: { id, name, email } }
```

**Login User**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user: { id, name, email } }
```

### Favorites Endpoints (Requires Authentication)

**Get User's Favorites**
```
GET /api/favorites/:userId
Authorization: Bearer <token>

Response: { favorites: [1, 2, 3, ...] }
```

**Add Recipe to Favorites**
```
POST /api/favorites/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "recipeId": 1
}

Response: { favorites: [1, 2, 3, ...] }
```

**Remove Recipe from Favorites**
```
POST /api/favorites/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "recipeId": 1
}

Response: { favorites: [1, 2, 3, ...] }
```

## 🛠️ Key Components

### AuthContext (Global State Management)
Manages:
- User authentication state
- User favorites
- Loading states
- API communication

Methods:
- `register(name, email, password)` - Create new user
- `login(email, password)` - Authenticate user
- `logout()` - Clear session
- `addFavorite(recipeId)` - Add to favorites
- `removeFavorite(recipeId)` - Remove from favorites

### Protected Route Component
Ensures only authenticated users can access:
- Recipe detail pages
- Favorites page

### Responsive Pages

**Login Page**
- Email input with validation
- Password input with toggle visibility
- Error message display
- Loading state
- Links to register and home

**Register Page**
- Full name input
- Email input
- Password input with confirmation
- Form validation
- Error display
- Loading state

**Updated Navbar**
- Shows user name when logged in
- Logout button
- Login/Register links when not logged in
- Conditional "Favorites" link (only when logged in)

**Updated Favorites Page**
- Shows user's saved recipes
- Empty state with call-to-action
- Click recipe to view details
- Smooth animations

## 🎨 Styling

- **Theme**: Dark glassmorphism with gradient accents
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design
- **Colors**: Purple/pink gradients with dark background

## 🐛 Troubleshooting

### "Cannot find module" errors
- Run `npm install` in both frontend and backend directories

### "MongoDB connection refused"
- Ensure MongoDB is running (`mongod` command)
- Check MONGODB_URI in `.env`
- For MongoDB Atlas, verify IP whitelist

### "CORS error"
- Ensure backend is running on port 5000
- Check frontend API_BASE_URL in AuthContext

### "Login shows 'Invalid email or password'"
- Verify user was registered
- Check email is entered correctly
- Ensure backend is running

### Favorites not persisting
- Check browser console for errors
- Verify authentication token is saved
- Ensure backend database is connected

### Frontend won't start
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`
- Ensure Node.js version is 14+

## 📱 Responsive Design

- **Desktop**: Full navigation with all features
- **Tablet**: Navigation adjusts, forms stack properly
- **Mobile**: Hamburger menu, single-column layout
- **Form inputs**: Optimized for touch input

## 🔒 Security Features

✅ Password hashing with bcryptjs
✅ JWT token-based authentication
✅ Token stored in localStorage (XSS vulnerable - consider httpOnly cookies for production)
✅ Protected API endpoints with middleware
✅ Email uniqueness validation
✅ Password minimum length requirement

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Update API_BASE_URL to production backend

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Connect MongoDB Atlas
3. Deploy using git or CLI
4. Update CORS origins for production domain

## 📚 Dependencies

### Frontend
- react & react-dom
- react-router-dom
- axios
- framer-motion
- tailwindcss

### Backend
- express
- mongodb
- bcryptjs
- jsonwebtoken
- cors
- dotenv

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

ISC License

## 📞 Support

For issues or questions, check the troubleshooting section or review the setup guides included in the project.

---

**Happy Cooking!** 👨‍🍳🍳
