const blogPosts = (sequelize, DataTypes) => {
  const tableBlogPosts = sequelize.define("BlogPosts", {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, { timestamps: false });

  tableBlogPosts.associate = (models) => {
    tableBlogPosts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user'
    });
  };

  return tableBlogPosts;
}

module.exports = blogPosts;