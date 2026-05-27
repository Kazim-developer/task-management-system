import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";

export const getTeams = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const teams = await prisma.team.findMany({
    where: { createdById: userId },
    select: { id: true, name: true, members: true },
  });

  res.status(200).json({ teams });
});
