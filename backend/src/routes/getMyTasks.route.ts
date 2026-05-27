import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { getMyTasks } from "../controllers/getMyTasks.controller.js";

const myTasksRouter = express.Router();

myTasksRouter.get("/my-tasks", isAuthenticated, getMyTasks);

export default myTasksRouter;
