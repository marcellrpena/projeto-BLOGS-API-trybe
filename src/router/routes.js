const express = require('express');
// autorização e validação de login
const authorization = require('./authorization.router');

const routers = express.Router();

// rota pública
routers.use('/login', authorization);

module.exports = routers;