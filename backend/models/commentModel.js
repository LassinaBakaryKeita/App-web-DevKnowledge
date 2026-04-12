const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        // Référence vers l'utilisateur auteur du commentaire
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        articleId: {
            type: String,
            required: true,
        },
        commentContain: {
            type: String,
            required: true,
            maxlength: 1000,
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;