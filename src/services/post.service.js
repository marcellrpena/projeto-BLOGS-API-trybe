const { validateNewPost, validateUpdatePost } = require('./validations/postInputValidation');
const { BlogPost, User, Category } = require('../models');
const statusCode = require('../helpers/statusCode');
const { addPostsCategories } = require('./postsCategories.service');
const errorMessage = require('../helpers/errorMessage');

const addNewPost = async (data, userId) => {
  const error = await validateNewPost(data);
  if (error.status) return error;
  const { categoryIds } = data;
  const newPost = await BlogPost.create({ userId, ...data });
  const { dataValues } = newPost;
  await addPostsCategories(dataValues.id, categoryIds);
  return { status: statusCode.CREATED, message: dataValues };
};

const reformulatedPosts = (posts) => posts.map(({ dataValues }) => ({
  ...dataValues,
  user: dataValues.users.dataValues,
  categories: dataValues.categories.map((category) => category.dataValues),
}));

const formatedSinglePost = (posts) => ({
  ...posts,
  user: posts.users.dataValues,
  categories: posts.categories.map((category) => category.dataValues),
});

const getAllPost = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'users', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    through: { attributes: [] },
  });
  return reformulatedPosts(posts);
};

const getPostById = async (id) => {
  const posts = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'users', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!posts) return { status: statusCode.NOT_FOUND, message: errorMessage.postNotExist };
  const { dataValues } = posts;
  const postFormated = formatedSinglePost(dataValues);
  return { status: statusCode.OK, message: postFormated };
};

const updatePost = async (id, data, name) => {
  const error = await validateUpdatePost(id, data, name);
  if (error.status) return error;
  await BlogPost.update(
    { ...data },
    { where: { id } },
  );
  const posts = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'users', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  const { dataValues } = posts;
  const postFormated = formatedSinglePost(dataValues);
  return { status: statusCode.OK, message: postFormated };
};

module.exports = {
  addNewPost,
  getAllPost,
  getPostById,
  updatePost,
};