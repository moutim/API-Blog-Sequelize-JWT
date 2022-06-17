const service = require('../services/categories.service');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await service.createCategory(name);

  res.status(201).json(category);
};

const getCategories = async (req, res) => {
  const categories = await service.getCategories();

  res.status(200).json(categories);
};

const getCategory = async (req, res) => {
  const { id } = req.params;

  const category = await service.getCategory(id);

  res.status(200).json(category);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;

  await service.updateCategory(req.body, id);

  res.status(200).json({ id, ...req.body });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await service.deleteCategory(id);

  res.status(204).end();
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};