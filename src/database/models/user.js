const user = (sequelize, DataTypes) => {
  const tableUser = sequelize.define("User", {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  tableUser.associate = (models) => {
    tableUser.hasOne(models.BlogPosts, {
      foreignKey: 'userId', as: 'posts'
    });
  };

  return tableUser;
}

module.exports = usuarios;