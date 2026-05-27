import { z } from "zod";

export const taskStatusSchema = z.object({
  taskId: z.string(),
});
