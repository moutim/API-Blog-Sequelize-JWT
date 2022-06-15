const category = (sequelize, DataTypes) => {
  const tableCategory = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  }, { timestamps: false });

  tableCategory.associate = (models) => {
    tableCategory.hasMany(models.PostCategories, {
      foreignKey: 'categoryId', as: 'PostCategories'
    });
  };

  return tableCategory;
}

module.exports = category;