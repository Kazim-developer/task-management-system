import express from "express";
import validateData from "../middlewares/validateData.middleware.js";
import { resetPasswordSchema } from "../validators/resetPasswordSchema.validator.js";
import { resetPassword } from "../controllers/resetPassword.controller.js";

const resetPasswordRouter = express.Router();

resetPasswordRouter.post(
  "/reset-password",
  validateData(resetPasswordSchema),
  resetPassword,
);

export default resetPasswordRouter;
