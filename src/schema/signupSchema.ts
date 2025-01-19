import { z } from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(2, "Email must be at least 2 characters long")
    .max(50, "Email cannot exceed 50 characters")
    .trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/\d/, "Password must include at least one number")
    .regex(/[@$!%*?&]/, "Password must include at least one special character (@$!%*?&)")
    .trim(),
});
