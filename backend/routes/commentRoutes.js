const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

//Route pour ajouter un article
router.post('/add',commentController.add); 

//Route pour recuperer tous les commentaires d'un article
router.get('/get/:articleId',commentController.get);

//Route pour recuperer le nombre de commentaires d'un article
router.get('/count/:articleId', commentController.count);

//Route pour supprimer un commentaire d'un article 
router.delete('/delete/:commentId',commentController.delete);


//Route pour update un commentaire d'un article
router.put("/update/:commentId",commentController.update);


module.exports=router;
