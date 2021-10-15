const express = require('express');

const route = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const auth = require('../middlewares/validation');
const controller = require('../controllers/articleController');

const upload = multer(multerConfig);

route.get('/articles', controller.allArticles);

route.get('/articleid/:id', controller.ArticleById);

route.get('/delete/:id', auth, controller.deleteArticle);
route.post('/new', auth, upload.single('img'), controller.newArticle);
route.post('/edit/:id', auth, controller.editArticle);

module.exports = route;
