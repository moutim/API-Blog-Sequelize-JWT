const service = require('../services/categories.service');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await service.createCategory(name);

  res.status(201).json(category);
};

module.exports = {
  createCategory,
};