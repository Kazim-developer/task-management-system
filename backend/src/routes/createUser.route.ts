import express from "express";
import validateData from "../middlewares/validateData.middleware.js";
import createUserSchema from "../validators/createUser.validator.js";
import { createUserController } from "../controllers/createUser.controller.js";

const createUserRouter = express.Router();

createUserRouter.post(
  "/signup",
  validateData(createUserSchema),
  createUserController,
);

export default createUserRouter;
