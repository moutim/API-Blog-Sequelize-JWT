const express = require('express');

const routes = express.Router();

const controller = require('../controllers/post.controller.js');

const middlewares = require('../middlewares');

routes.get('/', controller.getPosts);

routes.get('/search', controller.searchPost);

routes.get('/:id', controller.getPost);

routes.post('/', middlewares.verifyBodyPost, controller.createPost);

routes.put('/:id',
  middlewares.verifyIdentity,
  middlewares.verifyUpdatePost,
  controller.updatePost);

routes.delete('/:id', middlewares.verifyIdentity, controller.deletePost);

module.exports = routes;