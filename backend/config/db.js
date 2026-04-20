const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    // Si déjà connecté, on réutilise la connexion existante
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000, // abandonne si pas connecté en 10s
            socketTimeoutMS: 45000,          // timeout des opérations à 45s
        });

        isConnected = db.connections[0].readyState === 1;
        console.log('Connexion à MongoDB Atlas réussie !');
    } catch (error) {
        console.log('Connexion à MongoDB Atlas échouée : ' + error);
    }
};

module.exports = connectDB;