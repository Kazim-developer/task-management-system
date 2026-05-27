import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import validateData from "../middlewares/validateData.middleware.js";
import { taskStatusSchema } from "../validators/taskStatus.validator.js";
import { updateTaskStatus } from "../controllers/updateTaskStatus.controller.js";

const taskStatusRouter = express.Router();

taskStatusRouter.post(
  "/update-task",
  isAuthenticated,
  validateData(taskStatusSchema),
  updateTaskStatus,
);

export default taskStatusRouter;
