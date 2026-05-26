import { NextFunction, Request, Response } from "express";
import AppError from "../util/customErrorClass.js";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  throw new AppError("unauthorized", 401);
};
