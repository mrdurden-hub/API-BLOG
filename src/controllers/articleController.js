const cloudinary = require('../config/cloudnary');
const Article = require('../models/Articles');

// Busca todos os artigos no banco de dados
const allArticles = async (req, res) => {
  const articles = await Article.find();
  res.send(articles);
};

// Busca artigo por ID

const ArticleById = async (req, res) => {
  const articleById = await Article.findById(req.params.id);
  res.send(articleById);
};

// adiciona um novo artigo no banco de dados
const newArticle = async (req, res) => {
  if (!req.body) return res.status(404).send('Ocorreu algum erro');

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const user = await Article.create({
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      author: req.body.author,
      img: result.secure_url,
    });

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

// edita artigo existente no banco de dados
const editArticle = async (req, res) => {
  if (!req.params.id) return res.status(400).send('Ocorreu algum erro');

  try {
    const article = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
    };

    await Article.updateOne({ _id: req.params.id }, article);
    res.send(article);
  } catch (error) {
    console.log(error);
  }
};

// Deleta artigo existente no banco de dados
const deleteArticle = async (req, res) => {
  if (!req.params.id) return res.status(400).send('Ocorreu algum erro');
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.send('Artigo deletado com sucesso');
  } catch (e) {
    res.status(404).send(e);
  }
};

module.exports = {
  allArticles,
  ArticleById,
  newArticle,
  editArticle,
  deleteArticle,
};
