const statusCode = require('../helpers/statusCode');
const { checkToken } = require('../utils/jwtUtil');

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const { status, message } = checkToken(authorization);
  if (!status) {
    return res.status(statusCode.UNAUTHORIZED).json({ message });
  }
  // const { dataValues } = message;
  req.user = message;
  next();
};

module.exports = { validateToken };