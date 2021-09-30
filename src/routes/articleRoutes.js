const express = require('express');

const route = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multerConfig');

const controller = require('../controllers/articleController');

const upload = multer(multerConfig);

route.get('/articles', controller.allArticles);

route.get('/articleid/:id', controller.ArticleById);

route.get('/delete/:id', controller.deleteArticle);
route.post('/new', upload.single('img'), controller.newArticle);
route.post('/edit/:id', controller.editArticle);

module.exports = route;
