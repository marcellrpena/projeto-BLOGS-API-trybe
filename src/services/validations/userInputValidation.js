const { User } = require('../../models');
const errorMessage = require('../../helpers/errorMessage');
const statusCode = require('../../helpers/statusCode');
const { inputUserSchema } = require('./joiSchemas');

const validateNewUser = async (data) => {
  const { email } = data;
  const { error } = inputUserSchema.validate(data);
  if (error) {
      return { status: statusCode.BAD_REQUEST, message: { message: error.message } };
    }
  const findUser = await User.findOne({ where: { email } });
  if (findUser) return { status: statusCode.CONFLICT, message: errorMessage.emailExist };
  return { status: null };
};

module.exports = {
  validateNewUser,
};