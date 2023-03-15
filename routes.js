const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/middleware');

routes.get('/', homeController.index);

routes.get('/login/index', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/connect', loginController.connect);
routes.get('/login/logout', loginController.logout);

routes.get('/contacts/index', loginRequired, contactController.index);
routes.post('/contacts/register', loginRequired, contactController.register);

module.exports = routes;
