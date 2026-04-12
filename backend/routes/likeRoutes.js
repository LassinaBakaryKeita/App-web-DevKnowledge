const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

// Route pour l'action de cliquer
router.post("/toggle", likeController.toggle);

// Route pour vérifier l'état au chargement de la page
router.get("/check", likeController.checkIfLiked);

module.exports = router;