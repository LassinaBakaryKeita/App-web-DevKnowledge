const mongoose = require("mongoose");

// Singleton connection cache for serverless environments (Vercel)
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongooseInstance) => {
            console.log("Connexion à MongoDB Atlas réussie !");
            return mongooseInstance;
        }).catch((err) => {
            cached.promise = null;
            console.error("Connexion à MongoDB Atlas échouée :", err.message);
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};

module.exports = connectDB;