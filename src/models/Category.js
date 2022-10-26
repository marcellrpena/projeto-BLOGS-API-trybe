module.exports = (sequelize, DataTypes) => {
  const categoryTable = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'categories',
    underscored: true,
  });

  categoryTable.associate = (models) => {
    categoryTable.hasMany(models.PostCategory, {
      as: 'postsCategories',
      foreignKey: 'category_id'
    })
  }
  
  return categoryTable;
};