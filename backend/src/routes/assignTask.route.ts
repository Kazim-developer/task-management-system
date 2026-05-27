import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import validateData from "../middlewares/validateData.middleware.js";
import { assignTaskSchema } from "../validators/assignTask.validator.js";
import { assignTaskController } from "../controllers/assignTask.controller.js";

const assignTaskRouter = express.Router();

assignTaskRouter.post(
  "/assign-task",
  isAuthenticated,
  validateData(assignTaskSchema),
  assignTaskController,
);

export default assignTaskRouter;
