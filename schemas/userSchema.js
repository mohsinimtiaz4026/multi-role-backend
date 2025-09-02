const Joi = require("joi");

module.exports = {
  validateCreateRequest: ({ body }) => {
    const registerUserSchema = Joi.object({
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return registerUserSchema.validate(body);
  },
  validateLoginRequest: ({ body }) => {
    const loginUserSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return loginUserSchema.validate(body);
  },
  validateUpdateRequest: ({ body }) => {
    const updateUserSchema = Joi.object({
      id: Joi.string().required(),
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
    });
    return updateUserSchema.validate(body);
  },
  validateDeleteRequest: ({ body }) => {
    const deleteUserSchema = Joi.object({
      id: Joi.string().required(),
    });
    return deleteUserSchema.validate(body);
  },
};
