const express = require('express');
const { userController } = require('../controllers');
const validToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.createUser);

router.get('/', validToken.validateToken, userController.getAllUsers);

module.exports = router;