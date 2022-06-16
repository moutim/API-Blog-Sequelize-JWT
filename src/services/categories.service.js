const { Category } = require('../database/models');

const createCategory = async (name) => {
  try {
    const category = await Category.create({ name });

    return { id: category.null, name };
  } catch (e) {
    throw new Error(JSON.stringify({ status: 500, message: e.message }));
  }
};

module.exports = {
  createCategory,
};