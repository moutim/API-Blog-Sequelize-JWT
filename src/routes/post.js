const express = require('express');

const routes = express.Router();

const controller = require('../controllers/post.controller.js');

const middlewares = require('../middlewares');

routes.get('/', controller.getPosts);

routes.get('/:id', controller.getPost);

routes.post('/', middlewares.verifyBodyPost, controller.createPost);

routes.put('/:id', middlewares.verifyUpdatePost, controller.updatePost);

module.exports = routes;