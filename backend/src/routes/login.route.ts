import express from "express";
import validateData from "../middlewares/validateData.middleware.js";
import loginSchema from "../validators/loginSchema.validator.js";
import passport from "passport";

const loginRouter = express.Router();

loginRouter.post(
  "/login",
  validateData(loginSchema),
  passport.authenticate("local"),
  (req, res) => {
    res.json({
      message: "Login successful",
      user: req.user,
    });
  },
);

export default loginRouter;
