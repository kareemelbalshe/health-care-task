import express from "express";
import { getDoctorsByFilter } from "../controller/doctor.controller.js";

const router = express.Router();

router.get("/", getDoctorsByFilter);

export default router;
