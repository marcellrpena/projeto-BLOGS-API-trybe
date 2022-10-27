const { validateNewPost } = require('./validations/postInputValidation');
const { BlogPost } = require('../models');
const statusCode = require('../helpers/statusCode');
const { addPostsCategories } = require('./postsCategories.service');

const addNewPost = async (data, userId) => {
  console.log(data.categoryIds);
  const error = await validateNewPost(data);
  console.log(error);
  if (error.status) return error;
  const { categoryIds } = data;
  const newPost = await BlogPost.create({ userId, ...data });
  const { dataValues } = newPost;
  await addPostsCategories(dataValues.id, categoryIds);
  return { status: statusCode.CREATED, message: dataValues };
};

module.exports = {
  addNewPost,
};