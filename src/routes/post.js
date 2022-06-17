const express = require('express');

const routes = express.Router();

const controller = require('../controllers/post.controller.js');

const middlewares = require('../middlewares');

routes.post('/', middlewares.verifyBodyPost, controller.createPost);

module.exports = routes;