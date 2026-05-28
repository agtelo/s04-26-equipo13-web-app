import { z } from "zod";

export const NewPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres")
      .regex(/[A-Z]/, "Debe contener una mayúscula")
      .regex(/[a-z]/, "Debe contener una minúscula")
      .regex(/[@$!%*?&]/, "Debe contener un carácter especial"),
    repeatPassword: z.string(),
  })
  .refine((value) => value.password === value.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"],
  });

export type NewPasswordFormType = z.infer<typeof NewPasswordFormSchema>;
