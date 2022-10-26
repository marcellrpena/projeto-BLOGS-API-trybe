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

        return data;
    } catch (error) {
        const e = new Error('Token inválido');
        e.name = 'Não válido';
        throw e;
    }
};

const newToken = (user) => {
    const { password: _, ...userWithoutPassword } = user;
    const token = createToken(userWithoutPassword);
    return { status: null, message: token };
  };

module.exports = { createToken, validateToken, newToken };