import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";
import validateData from "../middlewares/validateData.middleware.js";
import { addMemberSchema } from "../validators/addMember.validator.js";
import { addMember } from "../controllers/addMember.controller.js";

const addMemberRouter = express.Router();

addMemberRouter.post(
  "/add-member",
  isAuthenticated,
  validateData(addMemberSchema),
  addMember,
);

export default addMemberRouter;
