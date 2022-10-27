const { validateCategory } = require('./validations/categoryInputValidation');
const { Category } = require('../models');
// const statusCode = require('../helpers/statusCode');

const createCategory = async (category) => {
  const check = await validateCategory(category);
  if (check.status) return check;
  const newCategory = await Category.create(category);
  return { status: null, message: newCategory };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  getAllCategories,
};