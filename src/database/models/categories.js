const categories = (sequelize, DataTypes) => {
  const tableCategories = sequelize.define("Categories", {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, { timestamps: false });

  tableCategories.associate = (models) => {
    tableCategories.hasMany(models.PostCategories, {
      foreignKey: 'categoryId', as: 'PostCategories'
    });
  };

  return tableCategories;
}

module.exports = categories;