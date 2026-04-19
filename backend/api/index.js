const express = require('express');
const cors = require('cors');
const connectDB = require('../backend/config/db'); 
require('dotenv').config();

const userRoutes = require('../backend/routes/userRoutes');
const articleRoutes = require('../backend/routes/articleRoutes');
const likeRoute = require('../backend/routes/likeRoutes');
const commentRoute = require('../backend/routes/commentRoutes');

const app = express();

// Connexion DB
connectDB();

// Middlewares
app.use(cors({
    origin: "https://app-web-dev-knowledge.vercel.app"
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/like', likeRoute);
app.use('/api/comment', commentRoute);


module.exports = app;