const express = require('express');
// autorização e validação de login
const authorization = require('./authorization.router');
const userRouter = require('./user.router');

const routers = express.Router();

// rota pública
routers.use('/login', authorization);
routers.use('/user', userRouter);

// rotas privadas

module.exports = routers;