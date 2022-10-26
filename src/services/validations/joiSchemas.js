const Joi = require('joi');

const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();
const imageSchema = Joi.string();

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const displayNameSchema = Joi.string().min(8).required();

const inputUserSchema = Joi.object({
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema,
  image: imageSchema,
});

module.exports = {
  loginSchema,
  inputUserSchema,
};