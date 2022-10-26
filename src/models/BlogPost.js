module.exports = (sequelize, DataTypes) => {
  const postTable = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATA,
    updated: DataTypes.DATA,
  },
  {
    tableName: 'blog_posts',
    underscored: true,
    createdAt: 'published',
    updatedAt: 'updated',
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