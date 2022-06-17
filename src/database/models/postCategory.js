const postCategories = (sequelize, DataTypes) => {
  const tablePostCategories = sequelize.define("PostCategory", {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, { timestamps: false });

  tablePostCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: tablePostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'postCategory'
    });

    models.BlogPost.belongsToMany(models.Category, {
      through: tablePostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories'
    });
  };

  return tablePostCategories;
}

module.exports = postCategories;