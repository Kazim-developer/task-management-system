import { z } from "zod";

const createTeamSchema = z.object({
  name: z.string().min(5, { error: "name should be of min 5 characters" }),
  userId: z.string(),
});

export default createTeamSchema;
