const articleModel = require('../models/articleModel');

// Création d'un article
module.exports.createArticle = async (req, res) => {
    const { title, author, shortDescription, fullDescription, userId } = req.body;
    const imagePath = req.file ? req.file.path : null;

    try {
        const newArticle = await articleModel.create({
            title,
            author,
            shortDescription,
            fullDescription,
            image: imagePath,
            userId,
        });
        res.status(201).json({ article: newArticle._id, message: 'Article ajouté !' });
    } catch (error) {
        console.log("Erreur lors de l'ajout :", error);
        res.status(400).json({ error: "Erreur lors de l'ajout" });
    }
};

// Récupérer tous les articles (page Blog & Home)
module.exports.getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.find().sort({ createdAt: -1 });
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: 'Erreur de récupération' });
    }
};

// Récupérer uniquement les articles de l'utilisateur connecté
module.exports.getMyArticles = async (req, res) => {
    try {
        const { userId } = req.params;
        const articles = await articleModel.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({ error: 'Erreur de récupération' });
    }
};

// Mise à jour d'un article
module.exports.updateArticle = async (req, res) => {
    const { articleId } = req.params;
    const { title, author, shortDescription, fullDescription, userId } = req.body;
    const imagePath = req.file ? req.file.path : null;

    // On ne remplace l'image que si une nouvelle a été uploadée
    const fieldsToUpdate = { title, author, shortDescription, fullDescription, userId };
    if (imagePath) {
        fieldsToUpdate.image = imagePath;
    }

    try {
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
        res.status(500).json({ message: 'Erreur serveur' });
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
        res.status(500).json({ message: 'Erreur serveur' });
    }
};