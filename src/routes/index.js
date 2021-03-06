const express = require('express');

const routes = express.Router();

const middlewares = require('../middlewares');

routes.use('/login', require('./login'));

routes.use('/user', require('./user'));

routes.use('/categories', middlewares.authenticateToken, require('./categories'));

routes.use('/post', middlewares.authenticateToken, require('./post'));

module.exports = routes;