import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { getTeams } from "../controllers/getTeams.controller.js";

const getTeamsRouter = express.Router();

getTeamsRouter.get("/teams", isAuthenticated, getTeams);

export default getTeamsRouter;
