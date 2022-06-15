const express = require('express');

const routes = express.Router();

routes.use('/login', require('./login'));

routes.use('/user', require('./user'));

module.exports = routes;