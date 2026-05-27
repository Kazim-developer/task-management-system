import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";

export const getTeamDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const teamId = req.params.id;

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: {
        id: true,
        name: true,
        members: {
          select: {
            id: true,
            role: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        tasks: {
          select: {
            id: true,
            title: true,
            status: true,
            assignedTo: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(team);
  },
);
