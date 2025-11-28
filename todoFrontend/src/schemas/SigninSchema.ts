import z from "zod";

export const signinSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SigninType = z.infer<typeof signinSchema>;