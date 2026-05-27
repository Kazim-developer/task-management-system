import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";

export const getStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const totalTasks = await prisma.task.findMany({
    where: { assignedToId: userId },
  });

  const completedTasks = await prisma.task.findMany({
    where: { assignedToId: userId, status: "DONE" },
  });

  const pendingTasks = await prisma.task.findMany({
    where: { assignedToId: userId, status: "TODO" },
  });

  const totalTeams = await prisma.team.findMany({
    where: { createdById: userId },
  });

  res.status(200).json({
    totalTasks: totalTasks.length,
    completedTasks: completedTasks.length,
    pendingTasks: pendingTasks.length,
    totalTeams: totalTeams.length,
  });
});
