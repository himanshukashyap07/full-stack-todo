import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email").min(1, "Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupType = z.infer<typeof signupSchema>;