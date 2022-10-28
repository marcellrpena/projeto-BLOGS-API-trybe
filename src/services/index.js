const authService = require('./autorization.service');
const userService = require('./user.service');
const categoryService = require('./category.service');
const postService = require('./post.service');
const postsCategoriesService = require('./postsCategories.service');

module.exports = {
  authService,
  userService,
  categoryService,
  postService,
  postsCategoriesService,
};