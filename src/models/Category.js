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

  UserTable.associate = (models) => {
    UserTable.hasMany(models.PostCategory, {
      as: 'posts_categories',
      foreignKey: 'category_id'
    })
  }
  
  return categoryTable;
};