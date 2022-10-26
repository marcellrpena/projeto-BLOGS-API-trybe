const { validateNewUser } = require('./validations/userInputValidation');
const { User } = require('../models');
const { newToken } = require('../utils/jwtUtil');
const statusCode = require('../helpers/statusCode');

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

module.exports = {
  addNewUser,
  getAllUsers,
};