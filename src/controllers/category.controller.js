const statusCode = require('../helpers/statusCode');
const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const newCat = await categoryService.createCategory(req.body);
  if (newCat.status) return res.status(newCat.status).json(newCat.message);
  return res.status(statusCode.CREATED).json(newCat.message);
};

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  return res.status(statusCode.OK).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};