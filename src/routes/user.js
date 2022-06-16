const express = require('express');

const routes = express.Router();

const controller = require('../controllers/user.controller');

const middlewares = require('../middlewares');

routes.get('/', middlewares.authenticateToken, controller.getUsers);

routes.get('/:id', middlewares.authenticateToken, controller.getUser);

routes.post('/', middlewares.verifyBodyUser, controller.createUser);

routes.put('/:id',
  middlewares.authenticateToken,
  middlewares.verifyBodyUser,
  controller.updateUser);

routes.delete('/me', middlewares.authenticateToken, controller.deleteUser);

module.exports = routes;
