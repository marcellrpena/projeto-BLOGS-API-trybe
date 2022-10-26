const { required, invalidField } = require('../helpers/errorMessage');
const statusCode = require('../helpers/statusCode');
const { loginSchema } = require('./validations/joiSchemas');
const { User } = require('../models');
const { newToken } = require('../utils/jwtUtil');

const validateBody = (user) => {
  const { error, value } = loginSchema.validate(user);
  if (error) {
    return { status: statusCode.BAD_REQUEST, message: required };
  }
  return value;
};

const validateLogin = async ({ email, password }) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return { status: statusCode.BAD_REQUEST, message: required };
  }

  const findUser = await User.findOne({
    where: { email, password },
  });

  if (!findUser) {
    return { status: statusCode.BAD_REQUEST, message: invalidField };
  }
  return newToken(findUser);
};

module.exports = {
  validateBody,
  validateLogin,
};