// api/index.js
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { register, login, logout } = require('./controllers/authController');
const { getAllItems, createItem, getCategories, deleteItems } = require('./controllers/itemController');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow requests from the React client
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

// Utility endpoint
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Authentication endpoints
app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

// Items endpoints (protected with requireAuth)
app.get('/items', requireAuth, getAllItems);
app.post('/add-items', requireAuth, createItem);
app.get('/categories', requireAuth,getCategories);
app.delete('/delete-items/:id', requireAuth,deleteItems);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
