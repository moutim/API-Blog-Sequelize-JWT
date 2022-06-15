const postCategories = (sequelize, DataTypes) => {
  const tablePostCategories = sequelize.define("PostCategories", {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, { timestamps: false });

  tablePostCategories.associate = (models) => {
    tablePostCategories.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    });

    tablePostCategories.belongsTo(models.Category, {
      foreignKey: 'categoryId', as: 'category'
    });
  };

  return tablePostCategories;
}

module.exports = postCategories;