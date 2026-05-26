import { z } from "zod";

const loginSchema = z.object({
  email: z.email({ error: "invalid email address" }),
  password: z.string(),
});

export default loginSchema;
