import express from "express";
import validateData from "../middlewares/validateData.middleware.js";
import loginSchema from "../validators/loginSchema.validator.js";
import passport from "passport";

const loginRouter = express.Router();

loginRouter.post("/login", validateData(loginSchema), (req, res, next) => {
  passport.authenticate("local", (err: any, user: any) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.json({
        message: "Login successful",
        user,
      });
    });
  })(req, res, next);
});

export default loginRouter;
