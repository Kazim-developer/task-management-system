import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";

export const updateTaskStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { taskId } = req.body;

    await prisma.task.update({
      where: { id: taskId },
      data: { status: "DONE" },
    });

    res.status(200).json({ message: "task status is updated" });
  },
);
