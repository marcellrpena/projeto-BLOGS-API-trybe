const Joi = require('joi');

const emailSchema = Joi.string().required();
const passwordSchema = Joi.string().required();

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

module.exports = {
  loginSchema,
};