import express from "express";
import {
  createMedicine,
  deleteMedicine,
  getMedicinesToVisit,
  updateMedicine,
} from "../controller/medicine.controller.js";
import { requireRole, verifyToken } from "../middleware/verifyToken.js";
import { validate } from "../middleware/validate.js";
import { MedicineSchema } from "../Joi/medicine.joi.js";

const router = express.Router();

router.get("/:visitId", verifyToken, getMedicinesToVisit);

router.post(
  "/:visitId",
  verifyToken,
  requireRole("doctor"),
  validate(MedicineSchema),
  createMedicine
);

router.put(
  "/:id",
  requireRole("doctor"),
  validate(MedicineSchema),
  updateMedicine
);

router.delete("/:id",verifyToken, requireRole("doctor"), deleteMedicine);

export default router;
