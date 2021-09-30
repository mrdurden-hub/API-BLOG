const express = require('express');

const route = express.Router();
const controller = require('../controllers/userControllers');
const auth = require('../middlewares/validation');

route.get('/users', controller.allUsers);
route.get('/user/delete/:id', auth, controller.deleteUser);
route.post('/user/register', controller.register);
route.post('/user/login', controller.login);
route.post('/user/edit/:id', auth, controller.editUser);

module.exports = route;
