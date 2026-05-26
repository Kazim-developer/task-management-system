import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";
import AppError from "../util/customErrorClass.js";
import bcrypt from "bcrypt";

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, newPassword } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      throw new AppError("no such email address found", 403);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.status(201).json({ message: "password resets successfully" });
  },
);
