import Joi from "joi";

export const createFinanceSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
});