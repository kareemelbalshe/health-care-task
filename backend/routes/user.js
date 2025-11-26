import express from "express";
import { getUser, updateUser, deleteUser } from "../controller/user.controller.js";
import { verifyToken, verifyTokenToUserHimself } from "../middleware/verifyToken.js";
import { updateUserSchema } from "../Joi/user.joi.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/:id", getUser);

router.put("/:id", verifyToken, validate(updateUserSchema), updateUser);

router.delete("/:id",verifyTokenToUserHimself, deleteUser);  

export default router;