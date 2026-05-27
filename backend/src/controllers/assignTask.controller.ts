import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";

export const assignTaskController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = String((req.user as any)?.id);
    const { task, memberId, dueDate, teamId } = req.body;

    await prisma.task.create({
      data: {
        title: task,
        dueDate: new Date(dueDate),
        assignedToId: memberId,
        teamId,
        createdById: userId,
      },
    });

    res.status(201).json({ message: "task is assigned" });
  },
);
