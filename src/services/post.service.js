const { validateNewPost } = require('./validations/postInputValidation');
const { BlogPost, User, Category } = require('../models');
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

const getAllPost = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'users', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    through: { attributes: [] },
  });
  const reformulatedPosts = posts
    .map(({ dataValues }) => ({
      ...dataValues,
      user: dataValues.users.dataValues,
      categories: dataValues.categories.map((category) => category.dataValues),
    }));
  return reformulatedPosts;
};

module.exports = {
  addNewPost,
  getAllPost,
};