const statusCode = require('../helpers/statusCode');
const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const newCat = await categoryService.createCategory(req.body);
  if (newCat.status) return res.status(newCat.status).json(newCat.message);
  return res.status(statusCode.CREATED).json(newCat.message);
};

module.exports = {
  createCategory,
};