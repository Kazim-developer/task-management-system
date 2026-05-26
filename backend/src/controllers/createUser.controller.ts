import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";
import AppError from "../util/customErrorClass.js";
import bcrypt from "bcrypt";

export const createUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      throw new AppError("user already exists, login instead", 403);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "user is registered successfully" });
  },
);
