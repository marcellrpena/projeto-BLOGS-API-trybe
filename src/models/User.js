module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timeStamps: false,
    tableName: 'users',
    underscored: true,
  });

  UserTable.associate = (models) => {
    UserTable.belongsTo(models.Blog_Post, {
      as: 'blog_posts',
      foreignKey: 'user_id'
    })
  }
  
  return UserTable;
};