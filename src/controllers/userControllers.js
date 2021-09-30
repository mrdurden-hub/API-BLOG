const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Busca todos os usuáriois no banco de dados
const allUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

// adiciona um novo usuário no banco de dados
const register = async (req, res) => {
  if (!req.body) return res.status(404).send('Ocorreu algum erro');
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

// edita um usuário existente no banco de dados
const editUser = async (req, res) => {
  if (!req.params.id) return res.status(400).send('Ocorreu algum erro');

  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    await User.updateOne({ _id: req.params.id }, user);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

// Deleta um usuário existente no banco de dados
const deleteUser = async (req, res) => {
  if (!req.params.id) return res.status(400).send('Ocorreu algum erro');
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('Usuario deletado com sucesso');
  } catch (e) {
    res.status(404).send(e);
  }
};

const login = async (req, res) => {
  // Check user email
  const selectedUser = await User.findOne({ email: req.body.email });
  if (!selectedUser) { return res.status(400).send('Usuário não encontrado.'); }

  // Check password
  const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
  if (!passwordAndUserMatch) return res.status(400).send('Email ou senha inválido');

  // Generate a token based on the user ID
  const token = jwt.sign({
    _id: selectedUser._id,
    admin: selectedUser.admin,
  }, process.env.TOKEN_SECRET);

  // Send token
  res.header('authorization-token', token);

  res.send('User logged in');
};

module.exports = {
  allUsers,
  deleteUser,
  editUser,
  register,
  login,
};
