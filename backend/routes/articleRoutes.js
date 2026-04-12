const express = require('express');
const router= express.Router();
const articleController= require('../controllers/articleController');
const multer = require('multer'); // Ce middleware permet la reception des images et des textes

const upload = multer({ dest: 'uploads/' }); // Les images iront dans ce dossier

//Route pour la création d'un article
router.post('/create' ,upload.single('image'),articleController.createArticle); 

//Route pour recuperation des articles de tous les articles
router.get('/all',articleController.getAllArticles);

//Route pour recuperation des articles d'un utilisateur spécifique
router.get('/mine/:userId',articleController.getMyArticles);


//Route pour mettre à jour un article spécifique
router.put('/update/:articleId', upload.single('image'), articleController.updateArticle);

//Route pour suppression d'un article spécifique
router.delete('/delete/:articleId',articleController.deleteArticle);


module.exports=router;