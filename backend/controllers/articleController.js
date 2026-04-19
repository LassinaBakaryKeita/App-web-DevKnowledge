const articleModel = require('../models/articleModel');
const cloudinary = require('cloudinary').v2;

// Configuration Cloudinary via les variables d'environnement
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload d'un buffer image vers Cloudinary
// Retourne l'URL publique de l'image
const uploadToCloudinary = (fileBuffer, filename) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'devknowledge', public_id: filename },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        stream.end(fileBuffer);
    });
};

// Création d'un article
module.exports.createArticle = async (req, res) => {
    const { title, author, shortDescription, fullDescription, userId } = req.body;

    try {
        let imageUrl = null;

        // Si une image est envoyée, on l'uploade sur Cloudinary
        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.buffer, `article_${Date.now()}`);
        }

        const newArticle = await articleModel.create({
            title, author, shortDescription, fullDescription,
            image: imageUrl,
            userId,
        });

        res.status(201).json({ article: newArticle._id, message: 'Article ajouté !' });
    } catch (error) {
        console.error('createArticle error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Récupérer tous les articles
module.exports.getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.find().sort({ createdAt: -1 });
        res.status(200).json(articles);
    } catch (error) {
        console.error('getAllArticles error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Récupérer les articles de l'utilisateur connecté
module.exports.getMyArticles = async (req, res) => {
    try {
        const { userId } = req.params;
        const articles = await articleModel.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(articles);
    } catch (error) {
        console.error('getMyArticles error:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// Mise à jour d'un article
module.exports.updateArticle = async (req, res) => {
    const { articleId } = req.params;
    const { title, author, shortDescription, fullDescription, userId } = req.body;

    const fieldsToUpdate = { title, author, shortDescription, fullDescription, userId };

    try {
        // Si une nouvelle image est envoyée, on l'uploade sur Cloudinary
        if (req.file) {
            const imageUrl = await uploadToCloudinary(req.file.buffer, `article_${Date.now()}`);
            fieldsToUpdate.image = imageUrl;
        }

        const result = await articleModel.findByIdAndUpdate(
            articleId,
            { $set: fieldsToUpdate },
            { new: true }
        );

        if (result) {
            res.status(200).json({ message: 'Article mis à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Article introuvable' });
        }
    } catch (error) {
        console.error('updateArticle error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Suppression d'un article
module.exports.deleteArticle = async (req, res) => {
    const { articleId } = req.params;
    try {
        const result = await articleModel.findByIdAndDelete(articleId);
        if (result) {
            res.status(200).json({ message: 'Article supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Article introuvable' });
        }
    } catch (error) {
        console.error('deleteArticle error:', error.message);
        res.status(500).json({ message: error.message });
    }
};