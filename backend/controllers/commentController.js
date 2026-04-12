const commentModel = require('../models/commentModel');

// Ajouter un commentaire
module.exports.add = async (req, res) => {
    const { userId, articleId, commentContain } = req.body;

    try {
        const comment = await commentModel.create({ userId, articleId, commentContain });
        res.status(201).json({ comment: comment._id });
    } catch (error) {
        console.log('Erreur lors de l\'enregistrement du commentaire :', error);
        res.status(500).json({ erreur: "Erreur lors de l'enregistrement du commentaire" });
    }
};

// Récupérer tous les commentaires d'un article
// Le populate remplace l'ID de l'auteur par son nom réel
module.exports.get = async (req, res) => {
    const { articleId } = req.params;

    try {
        const comments = await commentModel
            .find({ articleId })
            .populate('userId', 'name');

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ erreur: 'Erreur serveur' });
    }
};

// Compter le nombre de commentaires d'un article
module.exports.count = async (req, res) => {
    const { articleId } = req.params;

    try {
        const total = await commentModel.countDocuments({ articleId });
        res.status(200).json({ count: total });
    } catch (error) {
        res.status(500).json({ erreur: 'Erreur serveur' });
    }
};

// Modifier un commentaire existant
module.exports.update = async (req, res) => {
    const { commentId } = req.params;
    const { commentContain } = req.body;

    try {
        const result = await commentModel.findByIdAndUpdate(
            commentId,
            { commentContain },
            { new: true }
        );

        if (result) {
            res.status(200).json({ message: 'Commentaire mis à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Commentaire introuvable' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un commentaire
module.exports.delete = async (req, res) => {
    const { commentId } = req.params;

    try {
        const result = await commentModel.findByIdAndDelete(commentId);

        if (result) {
            res.status(200).json({ message: 'Commentaire supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Commentaire introuvable' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};