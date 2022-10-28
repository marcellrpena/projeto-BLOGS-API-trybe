const express = require('express');
const { postController } = require('../controllers');
const validToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validToken.validateToken, postController.addNewPost);

router.get('/', validToken.validateToken, postController.getAllPost);

module.exports = router;