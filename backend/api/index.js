const express = require('express');
const cors = require('cors');

require('dotenv').config();

const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const articleRoutes = require('../routes/articleRoutes');
const likeRoute = require('../routes/likeRoutes');
const commentRoute = require('../routes/commentRoutes');

const app = express();

connectDB();

app.use(cors({
    origin: 'https://app-web-dev-knowledge.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Route principale
app.get('/', (req, res) => {
    res.send('Backend DevKnowledge is running!');
});

// Route dédiée au keep-alive utilisée par cron-job.org toutes les 5 minutes
// pour éviter que le backend entre en veille sur Vercel
app.get('/ping', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Backend is alive',
        timestamp: new Date().toISOString()
    });
});

// Routes API
app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/like', likeRoute);
app.use('/api/comment', commentRoute);

module.exports = app;