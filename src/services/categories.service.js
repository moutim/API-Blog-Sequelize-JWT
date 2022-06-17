const { Category } = require('../database/models');

const createCategory = async (name) => {
  try {
    const category = await Category.create({ name });

    return { id: category.null, name };
  } catch (e) {
    throw new Error(JSON.stringify({ status: 500, message: e.message }));
  }
};

const getCategories = async () => {
  const categories = await Category.findAll();

  if (!categories) {
    throw new Error(JSON.stringify({ status: 500, message: 'Categories not found' }));
  }

  return categories;
};

const getCategory = async (id) => {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new Error(JSON.stringify({ status: 500, message: 'Category does not exist' }));
  }

  return category;
};

const updateCategory = async (body, id) => {
  await getCategory(id);

  try {
    const category = await Category.update(body, { where: { id } });

    return category;
  } catch (e) {
    throw new Error(JSON.stringify({ status: 500, message: e.message }));
  }
};

const deleteCategory = async (id) => {
  await getCategory(id);

  try {
    const category = await Category.destroy({ where: { id } });

    return category;
  } catch (e) {
    throw new Error(JSON.stringify({ status: 500, message: e.message }));
  }
};

module.exports = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};