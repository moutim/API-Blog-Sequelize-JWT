const express = require('express');

const routes = express.Router();

const controller = require('../controllers/login.controller.js');

const middlewares = require('../middlewares');

routes.post('/', middlewares.verirfyBodyLogin, controller.login);

module.exports = routes;