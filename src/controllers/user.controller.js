const statusCode = require('../helpers/statusCode');
const { userService } = require('../services');

const createUser = async (req, res) => {
  const { status, message } = await userService.addNewUser(req.body);
  console.log(status, message);
  if (status) return res.status(status).json(message);
  return res.status(statusCode.CREATED).json({ token: message });
};

module.exports = {
  createUser,
};