import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/(?=.*[0-9])/, {
      message: "Password must contain at least one number",
    }),
});
