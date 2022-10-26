const { validateNewUser } = require('./validations/userInputValidation');
const { User } = require('../models');
const { newToken } = require('../utils/jwtUtil');

const addNewUser = async (user) => {
  console.log(user);
  const error = await validateNewUser(user);
  if (error.status) return error;
  await User.create(user);
  return newToken(user);
};

module.exports = {
  addNewUser,
};