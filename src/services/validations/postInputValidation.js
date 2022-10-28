const errorMessage = require('../../helpers/errorMessage');
const statusCode = require('../../helpers/statusCode');
const { postSchema, updatePostSchema } = require('./joiSchemas');
const { Category, BlogPost } = require('../../models');
const { getUserByName } = require('../user.service');

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

const validateUpdatePost = async (postId, data, name) => {
  const { error } = updatePostSchema.validate(data);
  if (error) {
    return { status: statusCode.BAD_REQUEST, message: errorMessage.required };
  }
  const posts = await BlogPost.findByPk(postId);
  if (!posts) return { status: statusCode.NOT_FOUND, message: errorMessage.postNotExist };
  const { dataValues } = posts;
  const user = await getUserByName(name);
  const { id } = user.dataValues;
  if (dataValues.id !== id) {
    return { status: statusCode.UNAUTHORIZED, message: errorMessage.badUser };
  }

  return { status: null };
};

module.exports = {
  validateNewPost,
  validateUpdatePost,
};