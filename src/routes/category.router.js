const express = require('express');
const { categoryController } = require('../controllers');
const validToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validToken.validateToken, categoryController.createCategory);

/* router.get('/', validToken.validateToken, userController.getAllUsers);
router.get('/:id', validToken.validateToken, userController.getUserById); */

module.exports = router;