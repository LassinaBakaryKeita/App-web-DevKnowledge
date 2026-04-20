const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const multer = require('multer');

// memoryStorage garde le fichier en mémoire (Buffer) au lieu de l'écrire sur le disque.
// C'est necessaire  sur Vercel (serverless) car le système de fichiers n'est pas persistant.
// Le fichier sera ensuite envoyé directement à Cloudinary depuis la mémoire.
const storage = multer.memoryStorage();
const upload = multer({ storage });

// upload.single('image') indique à Multer d'intercepter un seul fichier
// Il rend le fichier accessible via req.file dans le controller.
router.post('/create', upload.single('image'), articleController.createArticle);
router.get('/all', articleController.getAllArticles);
router.get('/mine/:userId', articleController.getMyArticles);
router.put('/update/:articleId', upload.single('image'), articleController.updateArticle);
router.delete('/delete/:articleId', articleController.deleteArticle);

module.exports = router;