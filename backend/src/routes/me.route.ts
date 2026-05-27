import express, { Request, Response } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";

const meRouter = express.Router();

meRouter.get("/me", isAuthenticated, (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
});

export default meRouter;
