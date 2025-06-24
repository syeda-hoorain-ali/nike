import { z } from "zod"

export const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
})

export const resetPasswordSchema = z
  .object({
    code: z
      .string()
      .min(6, "Code must be at 6 characters")
      .max(6, "Code must be at 6 characters"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password cannot exceed 50 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/\d/, "Password must include at least one number")
      .regex(/[@$!%*?&]/, "Password must include at least one special character (@$!%*?&)")
      .trim(),

    confirmPassword: z
      .string()
      .trim(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type EmailFormData = z.infer<typeof emailSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
