import { z } from "zod";

export const addMemberSchema = z.object({
  teamId: z.string(),
  email: z.email(),
});
