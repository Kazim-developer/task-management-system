import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";

export const createTeam = asyncHandler(async (req: Request, res: Response) => {
  const { name, userId } = req.body;

  const result = await prisma.$transaction(async (tx) => {
    const team = await tx.team.create({ data: { name, createdById: userId } });

    await tx.teamMember.create({
      data: { teamId: team.id, role: "ADMIN", userId },
    });

    return team;
  });

  res.status(201).json({
    message: "team is created",
    data: {
      teamId: result.id,
      teamName: result.name,
    },
  });
});
