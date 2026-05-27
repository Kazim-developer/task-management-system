import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";

export const getTeamMembers = asyncHandler(
  async (req: Request, res: Response) => {
    const teamId = req.params.teamId;

    if (!teamId) {
      return;
    }

    const members = await prisma.team.findUnique({
      where: { id: teamId },

      select: {
        members: {
          where: {
            role: {
              not: "ADMIN",
            },
          },

          select: {
            userId: true,

            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!members) {
      return;
    }

    res.status(200).json(members);
  },
);
