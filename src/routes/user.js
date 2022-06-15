const express = require('express');

const routes = express.Router();

const controller = require('../controllers/user.controller');

const middlewares = require('../middlewares');

routes.post('/', middlewares.verifyBodyUser, controller.createUser);

module.exports = routes;
