const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 100,
        },
        // Référence vers l'utilisateur qui a publié l'article
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        author: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 255,
        },
        shortDescription: {
            type: String,
            required: true,
            minLength: 50,
            maxLength: 500,
        },
        fullDescription: {
            type: String,
            required: true,
            minLength: 500,
            maxLength: 100000,
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;