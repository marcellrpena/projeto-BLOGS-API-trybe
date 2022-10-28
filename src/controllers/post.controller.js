const statusCode = require('../helpers/statusCode');
const { postService } = require('../services');

const addNewPost = async (req, res) => {
  const { id } = req.user;
  const newPost = await postService.addNewPost(req.body, id);
  return res.status(newPost.status).json(newPost.message);
};

const getAllPost = async (_req, res) => {
  // const { id } = req.user;
  const posts = await postService.getAllPost();
  console.log(posts);
  return res.status(statusCode.OK).json(posts);
};

module.exports = {
  addNewPost,
  getAllPost,
};