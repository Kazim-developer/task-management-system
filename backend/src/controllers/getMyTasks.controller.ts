import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";

export const getMyTasks = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const tasks = await prisma.task.findMany({
    where: { assignedToId: userId },
    select: {
      id: true,
      title: true,
      status: true,
      dueDate: true,
      team: {
        select: {
          name: true,
          createdBy: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json(tasks);
});
