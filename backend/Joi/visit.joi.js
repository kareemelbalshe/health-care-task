import Joi from "joi";

export const createVisitSchema = Joi.object({
  notes: Joi.string(),
});

export const updateVisitSchema = Joi.object({
  status: Joi.string().required(),
  paymentStatus: Joi.string().required(),
  cost: Joi.number().required(),
  startDate: Joi.any(),
  endDate: Joi.any(),
});

export const updateVisitsToPatient = Joi.object({
  status: Joi.string().required(),
});
