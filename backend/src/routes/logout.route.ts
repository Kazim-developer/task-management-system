import express, { NextFunction, Request, Response } from "express";

const logoutRouter = express.Router();

logoutRouter.post(
  "/logout",
  (req: Request, res: Response, next: NextFunction) => {
    req.logout((error) => {
      if (error) {
        return next(error);
      }

      req.session.destroy((sessionError) => {
        if (sessionError) {
          return next(sessionError);
        }

        res.clearCookie("connect.sid");

        return res.status(200).json({
          message: "Logged out successfully",
        });
      });
    });
  },
);

export default logoutRouter;
