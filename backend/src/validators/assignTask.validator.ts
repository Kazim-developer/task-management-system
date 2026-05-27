import { z } from "zod";

export const assignTaskSchema = z.object({
  task: z.string({ error: "task cannot be empty" }),
  memberId: z.string({ error: "select member from the list" }),
  dueDate: z.string({ error: "select due date" }),
  teamId: z.string(),
});
