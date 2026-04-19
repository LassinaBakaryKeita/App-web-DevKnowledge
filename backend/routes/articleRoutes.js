const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', upload.single('image'), articleController.createArticle);
router.get('/all', articleController.getAllArticles);
router.get('/mine/:userId', articleController.getMyArticles);
router.put('/update/:articleId', upload.single('image'), articleController.updateArticle);
router.delete('/delete/:articleId', articleController.deleteArticle);

module.exports = router;