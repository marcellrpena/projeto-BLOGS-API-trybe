const { PostCategory } = require('../models');

const newList = (postId, categoryIds) => categoryIds
  .map((categoryId) => ({ postId, categoryId }));

const addPostsCategories = async (postId, categoryIds) => {
  const postCategoryList = newList(postId, categoryIds);

  await PostCategory.bulkCreate(postCategoryList); 
};

module.exports = {
  addPostsCategories,
};