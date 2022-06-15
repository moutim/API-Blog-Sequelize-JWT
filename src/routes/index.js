const express = require('express');

const routes = express.Router();

routes.use('/login', require('./login'));

module.exports = routes;