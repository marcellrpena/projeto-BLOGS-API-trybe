module.exports = (sequelize, DataTypes) => {
  const postCategoryTable = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  {
    timeStamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });
  postCategoryTable.associate = (models) => {
    // a chave postId pertence a muitas categorias por isso a referencia a blogPost e category e não a postCategoryTable
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategoryTable,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: postCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    })
  }
  
  return postCategoryTable;
};