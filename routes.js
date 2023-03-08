const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

routes.get('/', homeController.index);

routes.get('/login/index', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/connect', loginController.connect);
routes.get('/login/logout', loginController.logout);

module.exports = routes;
