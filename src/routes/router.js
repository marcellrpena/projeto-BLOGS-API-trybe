const express = require('express');
// autorização e validação de login
const authorization = require('./authorization.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');

const routers = express.Router();

// rota pública
routers.use('/login', authorization);
routers.use('/user', userRouter);
routers.use('/categories', categoryRouter);

// rotas privadas

module.exports = routers;