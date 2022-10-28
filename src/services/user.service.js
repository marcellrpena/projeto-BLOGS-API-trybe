const { validateNewUser, validateId } = require('./validations/userInputValidation');
const { User } = require('../models');
const { newToken } = require('../utils/jwtUtil');
const statusCode = require('../helpers/statusCode');
const errorMessage = require('../helpers/errorMessage');

const addNewUser = async (user) => {
  const error = await validateNewUser(user);
  if (error.status) return error;
  await User.create(user);
  return newToken(user);
};

const getAllUsers = async () => {
  const userList = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { status: statusCode.OK, message: userList };
};

const getUserById = async (userId) => {
  const error = validateId(userId);
  if (error) return error;
  const user = await User.findByPk(userId);
  if (!user) return { status: statusCode.NOT_FOUND, message: errorMessage.userNotExist };
  const { password: _, ...userWithoutPassword } = user.dataValues;
  console.log(userWithoutPassword);
  return { status: statusCode.OK, message: userWithoutPassword };
};

const getUserByName = async (displayName) => {
  const user = await User.findOne({ where: { displayName } });
  return user;
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserById,
  getUserByName,
};