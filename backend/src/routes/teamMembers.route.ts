import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import { getTeamMembers } from "../controllers/getTeamMembers.controller.js";

const getTeamMembersRouter = express.Router();

getTeamMembersRouter.get(
  "/team-members/:teamId",
  isAuthenticated,
  getTeamMembers,
);

export default getTeamMembersRouter;
