require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    // jwt.verify(token, process.env.JWT_SECRET);

    return { status: 200, message: data };
  } catch (error) {
    const e = 'Expired or invalid token';
    return { status: null, message: e };
  }
};

const checkToken = (token) => {
  if (!token) {
    return { status: null, message: 'Token not found' };
  }
  const user = validateToken(token);

  return user;
};

const newToken = (user) => {
  const { password: _, ...userWithoutPassword } = user;
  const token = createToken(userWithoutPassword);
  return { status: null, message: token };
};

module.exports = { createToken, validateToken, checkToken, newToken };