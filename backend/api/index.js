const express = require('express');
const cors = require('cors');


const connectDB = require('../config/db');
require('dotenv').config();

const userRoutes = require('../routes/userRoutes');
const articleRoutes = require('../routes/articleRoutes');
const likeRoute = require('../routes/likeRoutes');
const commentRoute = require('../routes/commentRoutes');

const app = express();

// Connexion à MongoDB Atlas
connectDB();

// Middlewares
app.use(cors({
    origin: 'https://app-web-dev-knowledge.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Route de test 
app.get('/', (req, res) => {
    res.send('Backend DevKnowledge is running!');
});

// Déclaration des routes API
app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/like', likeRoute);
app.use('/api/comment', commentRoute);

// Export CommonJS pour Vercel (serverless)
module.exports = app;