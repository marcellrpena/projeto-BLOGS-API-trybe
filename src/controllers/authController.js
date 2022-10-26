const statusCode = require('../helpers/statusCode');
const { authService } = require('../services');

const login = async (req, res) => {
  console.log(req.body);
  const token = await authService.validateLogin(req.body);
  if (token.status) {
    return res.status(token.status).json(token.message);
  }

  res.status(statusCode.OK).json({ token: token.message });
};

module.exports = {
  login,
};