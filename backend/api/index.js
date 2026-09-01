const express = require('express');
const cors = require('cors');

require('dotenv').config();

const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const articleRoutes = require('../routes/articleRoutes');
const likeRoute = require('../routes/likeRoutes');
const commentRoute = require('../routes/commentRoutes');

const app = express();

// Middleware ensuring DB connection before handling API routes
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('Database connection error in request middleware:', err.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
});


// Middlewares
const allowedOrigins = [
    'https://app-web-dev-knowledge.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true,
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