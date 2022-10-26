const statusCode = require('../helpers/statusCode');
const { userService } = require('../services');

const createUser = async (req, res) => {
  const { status, message } = await userService.addNewUser(req.body);
  if (status) return res.status(status).json(message);
  return res.status(statusCode.CREATED).json({ token: message });
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();
  return res.status(users.status).json(users.message);
};

module.exports = {
  createUser,
  getAllUsers,
};