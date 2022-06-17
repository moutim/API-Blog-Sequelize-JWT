const blogPosts = (sequelize, DataTypes) => {
  const tableBlogPosts = sequelize.define("BlogPost", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
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

    tableBlogPosts.hasMany(models.PostCategory, {
      foreignKey: 'postId', as: 'category'
    });
  };

  return tableBlogPosts;
}

module.exports = blogPosts;