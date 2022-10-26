module.exports = (sequelize, DataTypes) => {
  const postTable = sequelize.define('BlogPost', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATA,
    updated: DataTypes.DATA,
  },
  {
    timeStamps: true,
    tableName: 'blog_posts',
    underscored: true,
  });

  postTable.associate = (models) => {
    postTable.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'user_id'
    })
    postTable.hasMany(models.PostCategory, {
      as: 'posts_categories',
      foreignKey: 'post_id'
    })
  }
  
  return postTable;
};