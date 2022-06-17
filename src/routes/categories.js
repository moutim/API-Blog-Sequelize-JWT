const express = require('express');

const routes = express.Router();

const controller = require('../controllers/categories.controller');

const middlewares = require('../middlewares');

routes.get('/', controller.getCategories);

routes.get('/:id', controller.getCategory);

routes.post('/', middlewares.verifyBodyCategories, controller.createCategory);

routes.put('/:id', middlewares.verifyBodyCategories, controller.updateCategory);

routes.delete('/:id', controller.deleteCategory);

module.exports = routes;