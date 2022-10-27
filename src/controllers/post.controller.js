const { postService } = require('../services');

const addNewPost = async (req, res) => {
  const { id } = req.user;
  const newPost = await postService.addNewPost(req.body, id);
  return res.status(newPost.status).json(newPost.message);
};

module.exports = {
  addNewPost,
};