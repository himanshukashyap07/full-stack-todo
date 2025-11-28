import z from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;