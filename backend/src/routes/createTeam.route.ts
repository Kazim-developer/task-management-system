import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import validateData from "../middlewares/validateData.middleware.js";
import createTeamSchema from "../validators/createTeam.validator.js";
import { createTeam } from "../controllers/createTeam.controller.js";

const createTeamRouter = express.Router();

createTeamRouter.post(
  "/create-team",
  isAuthenticated,
  validateData(createTeamSchema),
  createTeam,
);

export default createTeamRouter;
