const { validateCategory } = require('./validations/categoryInputValidation');
const { Category } = require('../models');

const createCategory = async (category) => {
  const check = await validateCategory(category);
  if (check.status) return check;
  const newCategory = await Category.create(category);
  return { status: null, message: newCategory };
};

module.exports = {
  createCategory,
};