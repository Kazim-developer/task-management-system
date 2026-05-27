import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { getTeamDetail } from "../controllers/getTeamDetail.controller.js";

const teamDetailRouter = express.Router();

teamDetailRouter.get("/team/:id", isAuthenticated, getTeamDetail);

export default teamDetailRouter;
