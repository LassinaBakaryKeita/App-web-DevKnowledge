const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config({ path: './config/.env' });

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const likeRoute = require('./routes/likeRoutes');
const commentRoute = require('./routes/commentRoutes');

const app = express();

connectDB();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Déclaration des routes
app.use('/api/user/', userRoutes);
app.use('/api/article/', articleRoutes);
app.use('/api/like/', likeRoute);
app.use('/api/comment/', commentRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});