import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";
import AppError from "../util/customErrorClass.js";

export const addMember = asyncHandler(async (req: Request, res: Response) => {
  const { email, teamId } = req.body;

  const existingAccount = await prisma.user.findUnique({ where: { email } });

  if (!existingAccount) {
    throw new AppError("the email is not registered", 403);
  }

  const alreadyAdded = await prisma.teamMember.findFirst({
    where: { userId: existingAccount.id, teamId },
  });

  if (alreadyAdded) {
    throw new AppError("the email is added a member in this team", 403);
  }

  await prisma.teamMember.create({
    data: { teamId, userId: existingAccount.id },
  });

  res.status(201).json({ message: "member added successfully" });
});
