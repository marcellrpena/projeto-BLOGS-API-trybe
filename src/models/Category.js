module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('Category', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  },
  {
    timeStamps: false,
    tableName: 'users',
    underscored: true,
  });

  UserTable.associate = (models) => {
    UserTable.hasMany(models.PostCategory, {
      as: 'posts_categories',
      foreignKey: 'category_id'
    })
  }
  
  return UserTable;
};