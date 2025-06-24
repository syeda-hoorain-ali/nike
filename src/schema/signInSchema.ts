import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .trim(),
});

export type SignInFormData = z.infer<typeof signInSchema>
