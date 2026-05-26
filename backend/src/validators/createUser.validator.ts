import { z } from "zod";

const createUserSchema = z.object({
  name: z
    .string()
    .min(5, { error: "name should be of min 5 characters" })
    .max(20, { error: "name should be of max 20 characters" }),
  email: z.email({ error: "please enter a valid email" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .max(20, { error: "Password cannot exceed 20 characters" }),
});

export default createUserSchema;
