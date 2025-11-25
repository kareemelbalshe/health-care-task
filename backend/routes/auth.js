import express from "express";
import { login, register } from "../controller/auth.controller.js";
import { loginSchema, registerSchema } from "../Joi/auth.joi.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);

router.post("/register", validate(registerSchema), register);

export default router;
