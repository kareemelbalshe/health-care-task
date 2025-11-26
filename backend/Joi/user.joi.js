import Joi from "joi";

export const updateUserSchema = Joi.object({
  username: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string(),
});