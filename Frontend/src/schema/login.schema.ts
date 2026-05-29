import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Please enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters"),
});