import express from "express";
import {
  createVisit,
  getCurrentActiveVisit,
  getVisitById,
  getVisitsToDoctor,
  getVisitsToPatient,
  updateVisit,
} from "../controller/visit.controller.js";
import { requireRole, verifyToken } from "../middleware/verifyToken.js";
import { validate } from "../middleware/validate.js";
import {
  createVisitSchema,
  updateVisitSchema,
  updateVisitsToPatient,
} from "../Joi/visit.joi.js";

const router = express.Router();

router.get(
  "/doctor/:doctorId",
  verifyToken,
  requireRole("finance", "doctor"),
  getVisitsToDoctor
); //GET /api/v1/visits/doctor/64de9f83c6d?patientName=ahmed&paymentStatus=paid&date=2025-11-21

router.get("/:id", verifyToken, getVisitById);

router.get(
  "/active/:id",
  verifyToken,
  requireRole("finance", "doctor"),
  getCurrentActiveVisit
); //POST /api/v1/visits/active/64de9f83c6d

router.get(
  "/patient/:patientId",
  verifyToken,
  requireRole("patient"),
  getVisitsToPatient
); //GET /api/visits/patient/64de9f83c6d?&page=1&limit=10

router.post(
  "/:doctorId",
  verifyToken,
  requireRole("patient"),
  validate(createVisitSchema),
  createVisit
); //POST /api/visits

router.patch(
  "/:id",
  verifyToken,
  requireRole("finance", "doctor"),
  validate(updateVisitSchema),
  updateVisit
); //PATCH /api/visits/64de9f83c6d

router.patch(
  "/:id/patient",
  verifyToken,
  validate(updateVisitsToPatient),
  updateVisit
); //PATCH /api/visits/64de9f83c6d

export default router;
