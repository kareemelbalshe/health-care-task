import express from "express";
import {
  createFinance,
  getCostMedicinesToVisit,
} from "../controller/finance.controller.js";
import { requireRole, verifyToken } from "../middleware/verifyToken.js";
import { validate } from "../middleware/validate.js";
import { createFinanceSchema } from "../Joi/finance.joi.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  requireRole("doctor"),
  validate(createFinanceSchema),
  createFinance
);

router.get("/:visitId/medicines", getCostMedicinesToVisit);

export default router;
