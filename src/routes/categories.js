const express = require('express');

const routes = express.Router();

const controller = require('../controllers/categories.controller');

const middlewares = require('../middlewares');

routes.post('/', middlewares.verifyBodyCategories, controller.createCategory);

module.exports = routes;