const errorMessage = require('../../helpers/errorMessage');
const statusCode = require('../../helpers/statusCode');
const { postSchema } = require('./joiSchemas');
const { Category } = require('../../models');

const validateNewPost = async (data) => {
  const { categoryIds } = data;
  const { error } = postSchema.validate(data);
  if (error) {
    return { status: statusCode.BAD_REQUEST, message: errorMessage.required };
  }

  const categories = (await Category.findAll()).map(({ id }) => id);
  const exist = categoryIds.every((id) => categories.includes(id));
  
  if (!exist) return { status: statusCode.BAD_REQUEST, message: errorMessage.categoryNotFound };
  return { status: null };
};

/* console.log(validateNewPost({
  title: 'Latest updates, August 1st',
  content: 'The whole text for the blog post goes here in this key',
  // categoryIds: [1, 2],
})); */

module.exports = {
  validateNewPost,
};