const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

routes.get('/', homeController.index);

routes.get('/login/index', loginController.index);
routes.post('/login/register', loginController.register);

module.exports = routes;
