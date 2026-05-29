import { z } from "zod";

export const NewPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[@$!%*?&]/, "Must contain a special character"),
    repeatPassword: z.string(),
  })
  .refine((value) => value.password === value.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type NewPasswordFormType = z.infer<typeof NewPasswordFormSchema>;
