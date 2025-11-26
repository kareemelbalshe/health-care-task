import Joi from "joi";

export const MedicineSchema = Joi.object({
  name: Joi.string().required(),
  count: Joi.number().required(),
  description: Joi.string(),
  cost: Joi.number().required(),
});