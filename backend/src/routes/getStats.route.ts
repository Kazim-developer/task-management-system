import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { getStats } from "../controllers/getStats.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", isAuthenticated, getStats);

export default dashboardRouter;
