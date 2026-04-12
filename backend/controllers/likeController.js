const Like = require("../models/likeModel");
const Article = require("../models/articleModel");

// 1. Toggle Like / Dislike
module.exports.toggle = async (req, res) => {
    const { userId, articleId } = req.body;

    try {
        const existingLike = await Like.findOne({ userId, articleId });

        if (existingLike) {
            // 🤍 DISLIKE
            await Like.deleteOne({ userId, articleId });

            const updatedArticle = await Article.findByIdAndUpdate(
                articleId,
                { $inc: { likes: -1 } },
                { new: true }
            );

            return res.status(200).json({
                message: "dislike",
                likes: updatedArticle.likes
            });

        } else {
            // ❤️ LIKE
            await Like.create({ userId, articleId });

            const updatedArticle = await Article.findByIdAndUpdate(
                articleId,
                { $inc: { likes: 1 } },
                { new: true }
            );

            return res.status(201).json({
                message: "like",
                likes: updatedArticle.likes
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};


// 2. Vérifier si déjà liké
module.exports.checkIfLiked = async (req, res) => {
    const { userId, articleId } = req.query;

    try {
        const like = await Like.findOne({ userId, articleId });

        res.status(200).json({
            isLiked: !!like
        });

    } catch (error) {
        res.status(500).json({ message: "Erreur check status" });
    }
};