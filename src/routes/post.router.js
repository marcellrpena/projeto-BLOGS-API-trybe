const express = require('express');
const { postController } = require('../controllers');
const validToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validToken.validateToken, postController.addNewPost);

router.get('/:id', validToken.validateToken, postController.getPostById);
router.get('/', validToken.validateToken, postController.getAllPost);
router.put('/:id', validToken.validateToken, postController.updatePost);

module.exports = router;