import express, { Request, Response } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware.js";

const meRouter = express.Router();

meRouter.get("/me", isAuthenticated, (req: Request, res: Response) => {
  console.log("REQ.USER:", req.user);
  console.log("AUTH:", req.isAuthenticated());
  res.json({
    user: req.user,
  });
});

export default meRouter;
