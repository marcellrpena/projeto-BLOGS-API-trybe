module.exports = (sequelize, DataTypes) => {
  const categoryTable = sequelize.define('Category', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  },
  {
    timeStamps: false,
    tableName: 'categories',
    underscored: true,
  });

  categoryTable.associate = (models) => {
    categoryTable.hasMany(models.PostCategory, {
      as: 'posts_categories',
      foreignKey: 'category_id'
    })
  }
  
  return categoryTable;
};